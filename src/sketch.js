
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

// function calculatePressure(shape, center){
//   console.log("calculating pressure");
//   let pressure = 0;
//   let area = shape.calculate_area();
//   let moment_of_inertia = shape.calculate_moment_of_inertia();
//   let distance = center.distance_to(shape.origin_of_mass());
//   pressure = area * moment_of_inertia / distance;
//   return pressure;
// }

// a function to calculate the pressure of a shape under the water surface
// its known that the fluid is water
// the sum of the pressure on each line of the reservoir is given to the object as an array
// the object will calculate the pressure on each line and return the sum of the pressure on each line
function calculatePressure(shape) {
  console.log("calculating pressure");
  let pressureByLine = calculatePressureOnResevoirByLine();
  return shape.calculate_pressure(pressureByLine);
}

function calculatePressureOnResevoirByLine(){
  // pressure = depth * specificWeightOfWater * accelerationDueToGravity
  let accelerationDueToGravity = 9.8; // in m/s^2
  let specificWeightOfWater = 9810; // in kg/m^3
  let pressure = [];
  for (let i = 0; i < reservatorio_de_agua.altura; i++) {
    pressure.push((reservatorio_de_agua.altura - i) * specificWeightOfWater * accelerationDueToGravity);
  }
  return pressure;
}