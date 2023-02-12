const sharp = require("sharp");
const fs = require('fs')

function getMetadata(image) {
    const metadata = sharp(image).metadata();
    return metadata;
}

async function resizeImage(image, height, width) {
    await sharp(image)
        .resize(height, width, {
            fit: 'inside',
            withoutEnlargement: true
        })
        .toFile(image + '2');
    try {
        fs.renameSync(image + '2', image);
    } catch (error) {
        console.log(error)
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