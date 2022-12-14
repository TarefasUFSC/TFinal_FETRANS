
let altura_canvas = 400;
let largura_canvas = 400;

let reservatorio_de_agua = {
  altura: 10,
  largura: 8,
  postion_bottom_left: {
    x: 0,
    y: 0,
  },
}

let drawingShape = null;

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

  // desenha a forma que está sendo desenhada
  if (drawingShape != null) {
    drawingShape.draw();
  }

}

windowResized = function () {

  resizeCanvas(largura_canvas, altura_canvas);
};

function calculatePressure(shape, center){
  console.log("calculating pressure");
  let pressure = 0;
  let area = shape.calculate_area();
  let moment_of_inertia = shape.calculate_moment_of_inertia();
  let distance = center.distance_to(shape.origin_of_mass());
  pressure = area * moment_of_inertia / distance;
  return pressure;
}