const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;
    const off = width * 0.02;
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const fill = context.createLinearGradient(0, 0, width, height);
        fill.addColorStop(0, "cyan");
        fill.addColorStop(1, "orange");
        context.lineWidth = 4;

        // Fill rectangle
        context.fillStyle = fill;
        context.strokeStyle = fill;
        x = ix + (w + gap) * i;
        y = iy + (w + gap) * j;

        context.strokeStyle = "";

        if (Math.random() > 0.6) {
          context.beginPath();
          context.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
          context.strokeStyle = fill;
          context.stroke();
        }
        if (Math.random() < 0.1) {
          context.beginPath();
          context.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
          context.fill();
        }
        if (Math.random() > 0.7) {
          context.beginPath();
          context.arc(x + w / 2, y + h / 2, (w - off * 2) / 2, 0, Math.PI * 2);
          context.fill();
        }

        if (Math.random() > 0.7) {
          context.beginPath();
          context.arc(x + w / 2, y + h / 2, (w - off * 2) / 2, 0, Math.PI * 2);
          context.strokeStyle = "white";
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
