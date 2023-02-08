
function valideFile(file, resolution) {

    const SIZE_LIMIT = 10 * 1024 * 1024 // 10MB

    //Check size
    if (file.size > SIZE_LIMIT)
        return false;

    //Check extension
    if (file.mimetype != "image/png")
        return false;

    return true;
}

module.exports = valideFile