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

        if(parseInt(res_height_slider.value) > grid_dimensions){
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
        draw();
    });
    res_height_slider.addEventListener("input", function () {
        if(parseInt(res_height_slider.value) > grid_dimensions){
            res_height_slider.value = grid_dimensions;
        }
        res_height_span.innerHTML = parseInt(res_height_slider.value);
        reservatorio_de_agua.altura = parseInt(res_height_slider.value);
        draw();
    });

    


}