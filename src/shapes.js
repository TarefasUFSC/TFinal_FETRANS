class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dist(v) {
        return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
    }
}

class Shape {
    constructor(vertices, m) {
        this.vertices = vertices; // em referencia ao centro do plano cartesiano
        // A grid será dividida em espaços de 1m (ou seja, a dist entre dois vertices adjacentes é 1m)
        this.m = m; //em Kg
    }

    // não faço ideia se isso funciona kkk
    calculate_moment_of_inertia() {

        // reduz a forma em retangulos
        // calcula o momento de inercia de cada retangulo, linha a linha taé chagar no topo
        // soma os momentos de inercia de cada retangulo
        // retorna o momento de inercia total
        let moment_of_inertia = 0;
        // faz uma lista ordenada de vertices, em que cada item é uma lista de vertices com o mesmo y
        let vertices_by_y = [];
        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            let found = false;
            for (let j = 0; j < vertices_by_y.length; j++) {
                let vertices = vertices_by_y[j];
                if (vertices[0].y == vertex.y) {
                    vertices.push(vertex);
                    found = true;
                    break;
                }
            }
            if (!found) {
                vertices_by_y.push([vertex]);
            }
        }
        // pra cada lista de vertices com o mesmo y, ordena os vertices por x
        for (let i = 0; i < vertices_by_y.length; i++) {
            let vertices = vertices_by_y[i];
            vertices.sort((a, b) => a.x - b.x);
            vertices_by_y[i] = vertices;
        }
        console.log(vertices_by_y);

        // calcula a area de cada linha
        let area_T = 0;
        for (let i = 0; i < vertices_by_y.length - 1; i++) {
            let vertices = vertices_by_y[i];
            let width = vertices[vertices.length - 1].x - vertices[0].x;
            let height = vertices_by_y[i + 1][0].y - vertices[0].y;
            area_T += width * height;
        }

        // pra cada lista de vertices com o mesmo y, calcula o momento de inercia de cada retangulo
        for (let i = 0; i < vertices_by_y.length - 1; i++) {
            // distancia do primeiro x até o ultimo x
            let width = vertices_by_y[i][vertices.length - 1].x - vertices_by_y[i][0].x;
            let height = vertices_by_y[i + 1][0].y - vertices_by_y[i][0].y;
            let area = width * height;
            let vet_list = [];
            for (let j = 0; j < 1; j++) {
                let vertex = vertices_by_y[i][j];
                vet_list.push(vertex);
            }


            let rect = new Rectangle(vet_list, width, 1, area * this.m / area_T);
            moment_of_inertia += rect.calculate_moment_of_inertia();
        }




        return moment_of_inertia;
    }
    calculate_area() {
        let area_by_line = this.calculate_area_by_line();
        let area = 0;
        for (let i = 0; i < area_by_line.length; i++) {
            area += area_by_line[i];
        }
        return area;
    }
    calculate_area_by_line(){
        let vertices_by_y = [];
        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];
            let found = false;
            for (let j = 0; j < vertices_by_y.length; j++) {
                let vertices = vertices_by_y[j];
                if (vertices[0].y == vertex.y) {
                    vertices.push(vertex);
                    found = true;
                    break;
                }
            }
            if (!found) {
                vertices_by_y.push([vertex]);
            }
        }
        // pra cada lista de vertices com o mesmo y, ordena os vertices por x
        for (let i = 0; i < vertices_by_y.length; i++) {
            let vertices = vertices_by_y[i];
            vertices.sort((a, b) => a.x - b.x);
            vertices_by_y[i] = vertices;
        }
        console.log(vertices_by_y);

        // calcula a area de cada linha
        let area_T = [];
        for (let i = 0; i < vertices_by_y.length - 1; i++) {
            let vertices = vertices_by_y[i];
            let width = vertices[vertices.length - 1].x - vertices[0].x;
            let height = vertices_by_y[i + 1][0].y - vertices[0].y;
            area_T.push(width * height);
        }
        return area_T;
    }
};
class Rectangle extends Shape {
    constructor(vertices, w, h, m, center) {
        super(vertices, m);
        this.w = w; // largura em metros
        this.h = h; // altura em metros
        this.origin = center;
    }
    calculate_moment_of_inertia() {
        return this.w * this.h * this.h * this.h / 12;
    }
    calculate_area() {
        return this.w * this.h;
    }
    calculate_pressure(reservoirPressureByLine){
        let area_by_line = this.calculate_area_by_line();
        let area = 0;
        for (let i = 0; i < area_by_line.length; i++) {
            area += area_by_line[i];
        }
        let pressure = 0;
        for (let i = 0; i < area_by_line.length; i++) {
            pressure += area_by_line[i] * reservoirPressureByLine[this.origin.y-this.h+i];
        }
        return pressure;
    }
    calculate_area_by_line(){
        let area = [];
        for (let i = 0; i< this.h; i++){
            area.push(this.w);
        }
        return area;
    }
    draw() {
        // using p5.js
        push();
        // coloca cor branca
        fill(255);
        rect(parseInt((this.origin.x - this.w/2) * largura_canvas / grid_dimensions), ((grid_dimensions - this.origin.y)) * largura_canvas / grid_dimensions, this.w * largura_canvas / grid_dimensions, this.h * largura_canvas / grid_dimensions);
        pop();

    }
};
class Triangle extends Shape {
    constructor(vertices, m, b, h, center) {
        super(vertices, m);
        this.b = b; //base em metros
        this.h = h; //altura em metros
        this.origin = center;
    }
    calculate_moment_of_inertia() {
        return this.b * this.h * this.h * this.h / 36;
    }
    calculate_area() {
        return this.b * this.h / 2;
    }
}
let r = new Rectangle([new Vertex(0, 0), new Vertex(0, 1), new Vertex(1, 1), new Vertex(1, 0)], 1, 1, 1);
let s = new Shape([new Vertex(0, 0), new Vertex(0, 1), new Vertex(1, 1), new Vertex(1, 0)], 1);
let s2 = new Shape([new Vertex(0, 0), new Vertex(2, 0), new Vertex(0, 1), new Vertex(2, 1)], 1)