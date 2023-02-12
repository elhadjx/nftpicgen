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
        console.log('size limit')
        return false;
    }

    //Check extension
    if (file.mimetype != "image/png") {
        console.log(file)
        return false;
    }

    return true;
}

module.exports = { getDirectories, getFiles, validFile }