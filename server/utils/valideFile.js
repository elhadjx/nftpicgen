function valideFile(file) {

    const SIZE_LIMIT = 15 * 1024 * 1024 // 15MB
    //Check size
    if (file.size > SIZE_LIMIT)
        return false;


    //Check extension
    if (file.mimetype != "image/png")
        return false;
    return true;
}

module.exports = valideFile