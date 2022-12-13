// espera a tela carregar
window.onload = function () {
    // cria o event listener dos slider da grid
    let grid_slider = document.getElementById("grid_slider");
    let grid_span1 = document.getElementById("grid_value1");
    let grid_span2 = document.getElementById("grid_value2");


    // pega os valores dos sliders do reservatorio e faz os event listeners
    let res_width_slider = document.getElementById("res_width_slider");
    let res_width_span = document.getElementById("res_width_value");

    let res_height_slider = document.getElementById("res_height_slider");
    let res_height_span = document.getElementById("res_height_value");

    let shape_modifier_container = document.getElementById("shape_modifier_container");
    let rectangle_shape_selector = document.getElementById("rectangle_shape_selector");
    let rectangle_width_slider = null;
    let rectangle_height_slider = null;
    let rectangle_position_slider = null;


    grid_span1.innerHTML = parseInt(grid_slider.value);
    grid_span2.innerHTML = parseInt(grid_slider.value);
    grid_dimensions = parseInt(grid_slider.value);

    res_width_span.innerHTML = parseInt(res_width_slider.value);
    res_height_span.innerHTML = parseInt(res_height_slider.value);
    grid_slider.addEventListener("input", function () {
        grid_span1.innerHTML = parseInt(grid_slider.value);
        grid_span2.innerHTML = parseInt(grid_slider.value);
        grid_dimensions = parseInt(grid_slider.value);
        if (parseInt(res_width_slider.value) > parseInt(grid_slider.value)) {
            res_width_slider.value = parseInt(grid_slider.value);
        }
        res_width_span.innerHTML = parseInt(res_width_slider.value);
        reservatorio_de_agua.largura = parseInt(res_width_slider.value);

        if (parseInt(res_height_slider.value) > grid_dimensions) {
            res_height_slider.value = grid_dimensions;
        }
        res_height_span.innerHTML = parseInt(res_height_slider.value);
        reservatorio_de_agua.altura = parseInt(res_height_slider.value);

        


        draw();
    });

    res_width_slider.addEventListener("input", function () {
        if (parseInt(res_width_slider.value) > parseInt(grid_slider.value)) {
            res_width_slider.value = parseInt(grid_slider.value);
        }
        res_width_span.innerHTML = parseInt(res_width_slider.value);
        reservatorio_de_agua.largura = parseInt(res_width_slider.value);
        if (rectangle_width_slider) {
            rectangle_width_slider.max = parseInt(res_width_slider.value);
            if(parseInt(rectangle_width_slider.value) > parseInt(res_width_slider.value)){
                rectangle_width_slider.value = parseInt(res_width_slider.value);
                drawingShape.w = parseInt(res_width_slider.value);
                drawingShape.h = parseInt(res_width_slider.value);
            }
            drawingShape.center.x = parseInt(res_width_slider.value / 2);
        }
        draw();
    });
    res_height_slider.addEventListener("input", function () {
        if (parseInt(res_height_slider.value) > grid_dimensions) {
            res_height_slider.value = grid_dimensions;
        }
        res_height_span.innerHTML = parseInt(res_height_slider.value);
        reservatorio_de_agua.altura = parseInt(res_height_slider.value);
        if (rectangle_height_slider) {
            rectangle_height_slider.max = parseInt(res_height_slider.value);
            if(parseInt(rectangle_height_slider.value) > parseInt(res_height_slider.value)){
                rectangle_height_slider.value = parseInt(res_height_slider.value);
                drawingShape.h = parseInt(res_height_slider.value);
            }
            rectangle_position_slider.max = parseInt(res_height_slider.value - drawingShape.h);
            if(parseInt(rectangle_position_slider.value) > parseInt(res_height_slider.value - drawingShape.h)){
                rectangle_position_slider.value = parseInt(res_height_slider.value - drawingShape.h);
                drawingShape.center.y = parseInt(res_height_slider.value - drawingShape.h);
            }
            rectangle_position_slider.min = parseInt(drawingShape.h);
        }
        draw();
    });

    // cria event listener para selecionar a forma

    rectangle_shape_selector.addEventListener("click", function () {
        // coloca no html os parametros do retangulo no shape_modifier_container
        let h_value = 0;
        if (drawingShape) {
            h_value = drawingShape.h;
        }
        shape_modifier_container.innerHTML = `
        <div class="row">
            <div class="col-6">
                <label for="rectangle_height_slider">Altura</label>
                <input type="range" class="form-range" min="1" max="${reservatorio_de_agua.altura}" value="${parseInt(reservatorio_de_agua.altura / 2)}" id="rectangle_height_slider">
                <span id="rectangle_height_value">${parseInt(reservatorio_de_agua.altura / 2)}</span>
            </div>
            <div class="col-6">
                <label for="rectangle_width_slider">Largura</label>
                <input type="range" class="form-range" min="1" max="${reservatorio_de_agua.largura}" value="${parseInt((reservatorio_de_agua.largura-2) / 2)}" id="rectangle_width_slider">
                <span id="rectangle_width_value">${reservatorio_de_agua.largura}</span>
            </div>
            <div class="col-6">
                <label for="rectangle_position_slider">Posição</label>
                <input type="range" class="form-range" min="${parseInt(h_value)+1}" max="${parseInt(reservatorio_de_agua.altura - reservatorio_de_agua.altura / 2)}" value="${parseInt(reservatorio_de_agua.altura / 2)}" id="rectangle_position_slider">
                <span id="rectangle_position_value">${parseInt(reservatorio_de_agua.altura / 2)}</span>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" id="rectangle_shape_button">Calcular</button>
                </div>
        </div>
        `;
        // cria os event listeners dos sliders do retangulo
        rectangle_width_slider = document.getElementById("rectangle_width_slider");
        rectangle_height_slider = document.getElementById("rectangle_height_slider");

        drawingShape = new Rectangle([], parseInt(rectangle_height_slider.value), parseInt(rectangle_width_slider.value), 1, new Vertex(parseInt(reservatorio_de_agua.largura / 2), parseInt(reservatorio_de_agua.altura / 2)));
        rectangle_height_slider.addEventListener("input", function () {
            // alert(parseInt(rectangle_height_slider.value));
            let rectangle_height_value = document.getElementById("rectangle_height_value");
            rectangle_height_value.innerHTML = parseInt(rectangle_height_slider.value);
            drawingShape.h = parseInt(rectangle_height_slider.value);
            draw();

        });
        rectangle_width_slider.addEventListener("input", function () {
            let rectangle_width_value = document.getElementById("rectangle_width_value");
            rectangle_width_value.innerHTML = parseInt(rectangle_width_slider.value);
            drawingShape.w = parseInt(rectangle_width_slider.value);
            draw();
        });

        rectangle_position_slider = document.getElementById("rectangle_position_slider");
        rectangle_position_slider.addEventListener("input", function () {
            let rectangle_position_value = document.getElementById("rectangle_position_value");
            rectangle_position_value.innerHTML = parseInt(rectangle_position_slider.value);
            drawingShape.center.y = parseInt(rectangle_position_slider.value);
            draw();
        });
    });


    let triangle_shape_selector = document.getElementById("triangle_shape_selector");
    triangle_shape_selector.addEventListener("click", function () { });


    let generic_shape_selector = document.getElementById("generic_shape_selector");
    generic_shape_selector.addEventListener("click", function () { });

}