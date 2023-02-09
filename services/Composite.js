const sharp = require("sharp");

function getMetadata(image) {
    const metadata = sharp(image).metadata();
    return metadata;
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


module.exports = { getMetadata, compositeImages }