const { readdirSync } = require('fs')

function getDirectories(source) {

    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

function getFiles(source) {

    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
}

function validFile(file) {

    const SIZE_LIMIT = 10 * 1024 * 1024 // 10MB

    //Check size
    if (file.size > SIZE_LIMIT) {
        return false;
    }

    //Check extension
    if (file.mimetype != "image/png") {
        return false;
    }

    return true;
}

module.exports = { getDirectories, getFiles, validFile }