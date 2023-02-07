const express = require('express')
const fileUpload = require('express-fileupload')
const prettyBytes = require('pretty-bytes');

const PORT = process.env.PORT || 3500

const app = express()

//limit file upload size, BusBoy documentation https://github.com/mscdex/busboy#api
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));


app.post('/upload', function (req, res) {
    let files;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files Uploaded!')
        return res.status(400).send('No files were uploaded.');
    }
    let toReturn = "\n"
    let acceptedFiles = [];
    if (Object.keys(req.files["files"]).length > 1) {
        req.files["files"].forEach(file => {
            if (file) {

            }
            toReturn += `<pre></br>` +
                `Name: \t\t${file.name}</br>` +
                `Size: \t\t${prettyBytes(file.size)} </br>` +
                `Encoding: \t${file.encoding} </br>` +
                `tempFilePath: \t${file.tempFilePath} </br>` +
                `truncated: \t${file.truncated} </br>` +
                `mimetype: \t${file.mimetype} </br>` +
                `md5: \t\t${file.md5} </br>` +
                '\t\t</pre></br>'
        });
    }
    console.log(toReturn)
    console.log(Object.keys(req.files["files"]["0"]))
    res.send(toReturn);

    /*
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/out' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        console.log(`File Uploaded: ${sampleFile.name}`)
        res.send('File uploaded!');

    });
    */
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

