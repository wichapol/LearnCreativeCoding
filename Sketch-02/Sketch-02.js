const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  // Enable an animation loop
  /*: true,
  duration: 1,
  timeScale: 1,
  playbackRate: "fixed",*/
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const fill = context.createLinearGradient(0, 0, width * 0.05, height * 0.1);
    fill.addColorStop(0, "#3f5efb");
    fill.addColorStop(0.75, "#fc466b");

    const fill2 = context.createLinearGradient(
      0,
      0.5,
      width * 0.2,
      height * 0.3
    );
    fill2.addColorStop(0.2, "#30496B");
    fill2.addColorStop(0.6, "#30B8D2");
    fill2.addColorStop(1, "#DA1FF2");

    context.fillStyle = fill;
    context.strokeStyle = fill2;

    const cx = width * 0.5,
      cy = height * 0.5,
      w = width * 0.01,
      h = height * 0.1;

    let x, y;

    const num = 40;
    const radius = width * random.range(0.2, 0.4);

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.3, 2), random.range(-1, 0.8));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, h * 0.5), w, h);
      context.stroke();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.5, 1.2),
        slice * random.range(-1, -5),
        slice * random.range(1, 5)
      );
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

setTimeout(() => {
  location.reload();
}, 1000);
