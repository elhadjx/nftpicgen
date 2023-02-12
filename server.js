const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const prettyBytes = require('pretty-bytes');
const path = require('path')
const { compositeImages, resizeImage } = require('./services/Composite')
const { getDirectories, getFiles, validFile } = require('./utils/files')
const CreationCounter = require('./utils/CreationCounter')


const PORT = process.env.PORT || 3500

const app = express()

app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));

app.use('/result', express.static(path.join(__dirname, 'out')))
app.use('/', express.static(path.join(__dirname, 'public')))

/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'))
})
*/
app.post('/upload', function (req, res) {
    let files = []
    let uploadPath;
    let token = req.headers.token;

    const layers = req.files

    if (layers.length < 2) {
        return res.status(400).send('Use at least 2 layers, Each layer should have at least 1 image.');
    }

    Object.keys(layers).forEach(layer_index => {

        if (Object.keys(layer_index).length < 1)
            return res.status(400).send('Use at least 2 layers, Each layer should have at least 1 image.');

        Object.keys(layers[layer_index]).forEach(file_index => {
            let file = layers[layer_index][file_index];
            if (!validFile(file)) {
                return;
            }
            file.layerName = 'layer' + layer_index;
            files.push(file)
        })
    })


    let fileCount = 0;
    files.forEach(file => {

        if (!fs.existsSync(`./input/${token}`)) {
            fs.mkdirSync(`./input/${token}`);
        }
        if (!fs.existsSync(`./input/${token}/${file.layerName}`)) {
            fs.mkdirSync(`./input/${token}/${file.layerName}`);
        }
        let simagePath = `input/${token}/${file.layerName}/${fileCount++}.png`
        uploadPath = `${__dirname}/${simagePath}`;

        file.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            resizeImage(simagePath, 250, 250);
        });

    });
    return res.json({
        status: 'success', message: Object.keys(files).toString()
    })
})


app.get('/generate', (req, res) => {
    const token = req.headers.token;
    let nftQuantity = req.headers.nftq;

    if (!fs.existsSync(`./out/${token}`)) {
        fs.mkdirSync(`./out/${token}`);
    }
    let nftCount = 0;
    let possibleNFTs = 1;

    //Count possible NFTs
    let layersNames = getDirectories(`./input/${token}`)
    let layers = [];
    let maxsArray = [];

    layersNames.forEach(layerName => {
        let layerFiles = getFiles(`./input/${token}/${layerName}`)
        layers.push(layerFiles)
        maxsArray.push(layerFiles.length - 1)
        possibleNFTs *= layerFiles.length
    });

    nftQuantity = nftQuantity < possibleNFTs ? nftQuantity : possibleNFTs;
    let cCounter = new CreationCounter(maxsArray)
    let imagesRes = '';
    while (nftCount < nftQuantity) {
        let imageArray = []
        for (let lyi = 0; lyi < layers.length; lyi++) {
            imageArray.push(`input/${token}/${layersNames[lyi]}/${layers[lyi][cCounter.current[lyi]]}`)
        }
        compositeImages(imageArray, `out/${token}/${nftCount}`)
        cCounter.increment()
        imagesRes += `<img src="result/${token}/${nftCount}.png" width="250" height="250"> </br>`
        nftCount++
    }

    res.send(imagesRes)


})

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

