const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const prettyBytes = require('pretty-bytes');
const path = require('path')
const { compositeImages } = require('./services/Composite')
const { getDirectories, getFiles, validFile } = require('./utils/files')
const CreationCounter = require('./utils/CreationCounter')


const PORT = process.env.PORT || 3500

const app = express()

//DO NOT DELETE THIS LINE; limit file upload size, BusBoy documentation https://github.com/mscdex/busboy#api
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));

app.use('/static', express.static(path.join(__dirname, 'out')))
app.use('/css', express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', function (req, res) {
    let files = []
    let uploadPath;
    let token = req.body.token;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files Uploaded!')
        return res.status(400).send('No files were uploaded.');
    }

    let toReturn = "\n"
    const layers = Object.keys(req.files);

    if (layers.length < 2)
        return res.status(400).send('Use at least 2 layers, Each layer should have at least 1 image.');

    layers.forEach(layerName => {

        const layer = req.files[layerName];

        if (Object.keys(layer).length < 1)
            return res.status(400).send('Use at least 2 layers, Each layer should have at least 1 image.');

        layer.forEach(file => {

            if (!validFile(file))
                return;

            file.layerName = layerName;
            files.push(file)

            toReturn += `<pre></br>` +
                //
                `Layer: \t\t${file.layerName}</br>` +
                `Name: \t\t${file.name}</br>` +
                `Size: \t\t${prettyBytes(file.size)} </br>` +
                `Encoding: \t${file.encoding} </br>` +
                `tempFilePath: \t${file.tempFilePath} </br>` +
                `truncated: \t${file.truncated} </br>` +
                `mimetype: \t${file.mimetype} </br>` +
                `md5: \t\t${file.md5} </br>` +
                '\t\t</pre></br>';

        });

    });

    let fileCount = 0;
    files.forEach(file => {

        if (!fs.existsSync(`./input/${token}`)) {
            fs.mkdirSync(`./input/${token}`);
        }
        if (!fs.existsSync(`./input/${token}/${file.layerName}`)) {
            fs.mkdirSync(`./input/${token}/${file.layerName}`);
        }

        uploadPath = `${__dirname}/input/${token}/${file.layerName}/${fileCount++}.png`;

        file.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });
    });

    let dataResult = fs.readFileSync('result.html', 'utf8');
    if (dataResult)
        res.send(dataResult.replace('tokenValue', token));

});

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
        //console.log(cCounter)
        imagesRes += `<img src="static/${token}/${nftCount}.png" width="250" height="250"> </br>`
        nftCount++
    }

    res.send(imagesRes)


})

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

