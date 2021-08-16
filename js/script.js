/* Selectores */
buscadorFormulario = document.querySelector('#formulario');
buscadorBotones = document.querySelector('#generos-filtrar');
const listaPeliculas = document.querySelector('#lista-peliculas');
/* Listeners */
buscadorFormulario.addEventListener('submit', filtrarPeliculas);
document.addEventListener('DOMContentLoaded', filtrarPeliculasBoton);

/* Funciones */
function filtrarPeliculas(e){
    e.preventDefault();
    $.ajax({
        url:'js/peliculas.json',
        data: 'json',
        dataType: 'json',
        success: mostrarPeliculas
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    $.ajax({
        url: 'js/peliculas.json',
        success: function(data){
            cargarListaPeliculas(data);
        }
    });
});
function filtrarPeliculasBoton(e){
    e.preventDefault();
    $.ajax({
        url:'js/peliculas.json',
        data: 'json',
        dataType: 'json',
        success: mostrarPeliculasBoton
    });
}
function mostrarPeliculas(result) {
    const busqueda = $('#buscador').val();
    const resultado = result.filter(pelicula => {
        const peliculasTitulo = pelicula.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());
        return peliculasTitulo;
    })
    limpiarPeliculas()
    cargarListaPeliculas(resultado);
}
function mostrarPeliculasBoton(result) {   
    buscadorBotones.addEventListener('click', botonGenero);
    function botonGenero(e){
        e.preventDefault();
        const boton = e.path[0].id;
        const id = e.path[0].id;
        const resultado = result.filter(pelicula => {
            const peliculasGenero = pelicula.genero.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const peliculasTodo = pelicula.all.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const peliculas = peliculasGenero + peliculasTodo;
            return peliculas;
        })
        limpiarPeliculas()
        cargarListaPeliculas(resultado);
    }

}
function cargarListaPeliculas(peliculas) {
    $('#lista-peliculas').hide();
	peliculas.forEach((pelicula) => {
        const listaPeliculas = document.querySelector('#lista-peliculas');
		const { img, id } = pelicula;
		const divPelicula = document.createElement('div');
		divPelicula.classList.add('col-lg-2', 'col-md-3', 'col-sm-5','col-xs-4', 'd-flex', 'justify-content-center','aling-item-center', 'section-pelicula');
		divPelicula.innerHTML =
        `<div class="container-fluid justify-content-center" id="pelicula-lista">
            <div class="d-flex justify-content-center col-12">
                <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}">
                    <img class="imagen-pelicula" src="https://i.ibb.co/${img}/${id}.jpg" alt="">
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title titulo-pelicula" id="exampleModalLabel"></h4>
                            <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p class="descripcion"></p>
                                <h5 class="duracion"></h5>
                            </div>
                            <div class="modal-footer container d-flex justify-content-center">
                                <div class="row">
                                    <div class="d-flex justify-content-center col-6 wpp"></div>
                                    <div class="d-flex justify-content-center col-6 imdb"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

        listaPeliculas.appendChild(divPelicula);

        $(`#${id}`).click(function(){
            console.log('click')
            title = peliculas.filter(x =>x.id === id)
            console.log(title)
            console.log(peliculas)
            $('.titulo-pelicula').html(`${title[0].titulo} (${title[0].anio})`)
            $('.descripcion').html(`${title[0].descrip}`)
            $('.duracion').html(`Duración: ${title[0].tiempo}`)
            $('.wpp').html(`<a class="btn btn-warning" href="https://api.whatsapp.com/send?phone=+5493516287268&text=Quiero que veamos ${title[0].titulo}"target="_blank" role="button">Notificar</a>`)
            $('.imdb').html(`<a class="btn btn-warning" href="https://www.imdb.com/title/tt${title[0].link}/"target="_blank" role="button">IMDB</a>`)
        })

    })
    $('#lista-peliculas').fadeIn(500);
}
function limpiarPeliculas(){
    while (listaPeliculas.firstChild){
        listaPeliculas.removeChild(listaPeliculas.firstChild);
    }
}