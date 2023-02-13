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
        .toFile(image.slice(0, -1));


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
        setTimeout(() => {
            sharp(background)
                .composite(overBackground)
                .toFile(output + ".png");
        }, 2000)
    }
}



module.exports = { getMetadata, compositeImages, resizeImage }