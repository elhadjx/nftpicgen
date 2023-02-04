const fs = require("fs");
const path = require("path");
const canvas = require("canvas");

const { randomColor } = require("../utils/randomColor");
const { ShapeService } = require("./ShapeService");
const { random } = require("../utils/random");

class NFTService {
  static generateNFTQuantity(q) {
    for (let i = 0; i < q; i++) {
      this.generateNFT(i);
    }
  }

  static generateNFT(nftIndex) {
    // Create a canvas with a specified width and height
    const width = 1024;
    const height = 1024;
    const c = canvas.createCanvas(width, height);
    const ctx = c.getContext("2d");

    // Generate a random color for the background

    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, width, height);

    // Generate a random shape
    this.generateRandomShapes(ctx, width, height, 10);

    const outNFTPath = path.join(__dirname, `../../out/nft-${nftIndex}.png`);

    // Save the image to a file

    const out = fs.createWriteStream(outNFTPath);
    const stream = c.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log(`NFT ${nftIndex} was created: nft${nftIndex}.png`);
    });
  }

  static generateRandomShapes(ctx, width, height, max = 1) {
    const shapes = [
      ShapeService.circle,
      ShapeService.rectangle,
      ShapeService.circle,
      ShapeService.rectangle,
      // ShapeService.triangle,
    ];
    for (let i = 0; i < max; i++) {
      shapes[random(3)](ctx, width, height);
    }
  }
}

NFTService.generateNFTQuantity(4);

module.exports = { NFTService };
