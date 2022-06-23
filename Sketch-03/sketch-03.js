const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const agrnts = [];
  const num = 100;

  for (let i = 0; i < num; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agrnts.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, "#dbfdec");
    fill.addColorStop(1, "#ffc2d4");

    context.fillStyle = fill;
    context.fillRect(0, 0, width, height);

    agrnts.forEach((agrnt) => {
      agrnt.update();
      agrnt.draw(context);
      agrnt.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(10, 80);
    this.randomColor = this.randomColor.bind(this);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  randomColor() {
    const code = [
      "#03a9f43d",
      "#03f4413d",
      "#f4f0033d",
      "#f403033d",
      "#0c03f43d",
    ];
    let color;

    const randomColor = Math.floor(Math.random() * 4);

    return (color = code[randomColor]);
  }

  draw(context) {
    const { x, y } = this.pos;

    const fill = context.createRadialGradient(
      0,
      0,
      this.radius * 0.4,
      0,
      0,
      this.radius
    );

    // console.log(`#7cc7d45c``);

    context.save();

    fill.addColorStop(0, "#ffffff00");
    fill.addColorStop(1, "#48d5ff63");

    context.fillStyle = fill;
    context.strokeStyle = fill;

    context.translate(x, y);

    context.lineWidth = 10;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    // context.stroke();

    context.restore();
  }
}
