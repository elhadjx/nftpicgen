const sharp = require("sharp");
const fs = require('fs')

function getMetadata(image) {
    const metadata = sharp(image).metadata();
    return metadata;
}

async function resizeImage(image, height, width) {
    try {
        await sharp(image)
            .resize(height, width)
            .toFile(image + '2');
        fs.unlinkSync(image);
        fs.renameSync(image + '2', image, () => { })
    } catch (e) {
        console.log('eeee' + e)
    }
}

async function compositeImages(ImageArray, output) {
    let overBackground = []
    const background = ImageArray[0];
    ImageArray.forEach(image => {
        overBackground.push({
            input: image,
            top: 0,
            left: 0,
        })
    });
    try {
        await sharp(background)
            .composite(overBackground)
            .toFile(output + ".png");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getMetadata, compositeImages, resizeImage }