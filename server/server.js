const express = require('express')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 3500

const app = express()

//limit file upload size, BusBoy documentation https://github.com/mscdex/busboy#api
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));

app.post('/upload', function (req, res) {
    console.log(req.files.foo); // the uploaded file object
});


app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

