function setup() {
  createCanvas(1920, 1080);
  noLoop(); // Static image
  background(0); // Set a black background
}

function draw() {
  // Define the style for "Nebular Echoes"
  let nebularEchoesStyle = {
    color: function(depth) {
      // Soft, pastel color gradient from pink to light blue, with decreasing opacity
      return lerpColor(color(255, 182, 193, 100), color(135, 206, 235, 100), depth / 10);
    },
    weight: function(depth) {
      // Decrease stroke weight from base to tip for a softer look
      return map(depth, 0, 10, 3, 1);
    },
    branches: 3, // A modest number of branches to mimic the diffuse nature of nebulae
    angleOffset: function(i, depth) {
      // Varying the angle offset to give a natural, organic spread
      return (-PI / 6) + (PI / 3) * random(); // Randomize between -PI/6 and PI/6
    },
    lenShrink: 0.67 // Consistent shrink factor for branch length
  };

  // Starting parameters for the fractal drawing
  drawGalacticFractal(width / 2, height / 2, 100, -PI / 2, 10, nebularEchoesStyle);
}

function drawGalacticFractal(x, y, len, angle, depth, style) {
  if (depth === 0) return;

  let newX = x + cos(angle) * len;
  let newY = y + sin(angle) * len;

  stroke(style.color(depth));
  strokeWeight(style.weight(depth));
  line(x, y, newX, newY);

  for (let i = 0; i < style.branches; i++) {
    let newAngle = angle + style.angleOffset(i, depth);
    drawGalacticFractal(newX, newY, len * style.lenShrink, newAngle, depth - 1, style);
  }
}
