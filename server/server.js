const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const prettyBytes = require('pretty-bytes');
const path = require('path')
const valideFile = require('./utils/valideFile')

const PORT = process.env.PORT || 3500

const app = express()

//limit file upload size, BusBoy documentation https://github.com/mscdex/busboy#api
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post('/upload', function (req, res) {
    let files = []
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files Uploaded!')
        return res.status(400).send('No files were uploaded.');
    }

    let toReturn = "\n"
    const layers = Object.keys(req.files);
    if (layers.length > 1) {

        layers.forEach(layerName => {

            const layer = req.files[layerName];

            if (Object.keys(layer).length < 1)
                return;

            layer.forEach(file => {

                if (!valideFile(file))
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
    }
    let fileCount = 0;
    files.forEach(file => {

        if (!fs.existsSync('./out/' + file.layerName)) {
            fs.mkdirSync('./out/' + file.layerName);
        }

        uploadPath = `${__dirname}/out/${file.layerName}/${fileCount++}.png`;

        file.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });
    });

    res.status(200).send(toReturn);

});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

