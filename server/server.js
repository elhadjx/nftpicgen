const express = require('express')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 3500

const app = express()

//limit file upload size, BusBoy documentation https://github.com/mscdex/busboy#api
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));


app.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    //uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
        console.log('File Uploaded!')
    });
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

