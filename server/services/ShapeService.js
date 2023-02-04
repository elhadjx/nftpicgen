const canvas = require("canvas");

const { random } = require("../utils/random");
const { randomColor } = require("../utils/randomColor");

class ShapeService {
  static circle(ctx, width, height) {
    const x = random(width - 100) + 50;
    const y = random(height - 100) + 50;
    const radius = random(50) + 50;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = randomColor();
    ctx.fill();
  }

  static rectangle(ctx, width, height) {
    const x = random(width - 100) + 50;
    const y = random(height - 100) + 50;
    const w = random(100) + 50;
    const h = random(100) + 50;
    ctx.fillStyle = randomColor();
    ctx.fillRect(x, y, w, h);
  }

  static triangle(ctx, width, height) {
    const x1 = random(width - 100) + 50;
    const y1 = random(height - 100) + 50;
    const x2 = random(width - 100) + 50;
    const y2 = random(height - 100) + 50;
    const x3 = random(width - 100) + 50;
    const y3 = random(height - 100) + 50;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = randomColor();
    ctx.fill();
  }
}

module.exports = { ShapeService };
