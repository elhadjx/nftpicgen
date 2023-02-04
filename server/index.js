const canvas = require('canvas');
const fs = require('fs');

function generateNFTQuantity(q) {
    for (let i = 0; i < q; i++) {
        generateNFT(i)
    }
}

function generateNFT(nftIndex) {
    // Create a canvas with a specified width and height
    const width = 1024;
    const height = 1024;
    const c = canvas.createCanvas(width, height);
    const ctx = c.getContext('2d');

    // Generate a random color for the background

    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, width, height);

    // Generate a random shape
    const shapes = [circle, rectangle, triangle]
    for (let i = 0; i < 10; i++) {
        shapes[Math.floor(Math.random() * 3)](ctx, width, height);
    }


    // Save the image to a file
    const out = fs.createWriteStream(__dirname + `/out/nft${nftIndex}.png`);
    const stream = c.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
        console.log(`NFT ${nftIndex} was created: nft${nftIndex}.png`);
    });

}

function circle(ctx, width, height) {
    const x = Math.floor(Math.random() * (width - 100)) + 50;
    const y = Math.floor(Math.random() * (height - 100)) + 50;
    const radius = Math.floor(Math.random() * 50) + 50;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = randomColor();
    ctx.fill();
}

function rectangle(ctx, width, height) {
    const x = Math.floor(Math.random() * (width - 100)) + 50;
    const y = Math.floor(Math.random() * (height - 100)) + 50;
    const w = Math.floor(Math.random() * 100) + 50;
    const h = Math.floor(Math.random() * 100) + 50;
    ctx.fillStyle = randomColor();
    ctx.fillRect(x, y, w, h);
}

function triangle(ctx, width, height) {
    const x1 = Math.floor(Math.random() * (width - 100)) + 50;
    const y1 = Math.floor(Math.random() * (height - 100)) + 50;
    const x2 = Math.floor(Math.random() * (width - 100)) + 50;
    const y2 = Math.floor(Math.random() * (height - 100)) + 50;
    const x3 = Math.floor(Math.random() * (width - 100)) + 50;
    const y3 = Math.floor(Math.random() * (height - 100)) + 50;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = randomColor();
    ctx.fill();
}

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


generateNFTQuantity(100)