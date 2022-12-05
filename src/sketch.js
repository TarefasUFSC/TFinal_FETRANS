
let altura_canvas = 600;
let largura_canvas = 600;

let reservatorio_de_agua = {
  altura: 10,
  largura: 8,
  postion_bottom_left: {
    x: 0,
    y: 0,
  },
}

function setup() {

  createCanvas(largura_canvas, altura_canvas);
}
let grid_dimensions = 10;
function draw() {
  // put draswing here
  background(220);
  // desenha uma grid de pontos de acordo com as dimensões de grid_dimensions
  for (let i = 0; i < grid_dimensions; i++) {
    for (let j = 0; j < grid_dimensions; j++) {
      let x = i * largura_canvas / grid_dimensions;
      let y = j * altura_canvas / grid_dimensions;
      stroke(0);
      strokeWeight(1);
      point(x, y);
    }
  }
  // desenha o reservatorio de agua
  stroke(0);
  strokeWeight(1);
  // preenche com a cor azul
  fill(0, 0, 255);
  rect(
    reservatorio_de_agua.postion_bottom_left.x, 
    altura_canvas -   reservatorio_de_agua.altura* altura_canvas / grid_dimensions,
    reservatorio_de_agua.largura * largura_canvas / grid_dimensions, 
    altura_canvas -  (reservatorio_de_agua.postion_bottom_left.y) * altura_canvas / grid_dimensions);
}

windowResized = function () {

  resizeCanvas(largura_canvas, altura_canvas);
};

