import { API_KEY_UNSPLASH } from '../api/config.js';
const apiKey = API_KEY_UNSPLASH; // Reemplaza con tu clave API de la OMDBAPI


function activaBtnBuscar(){
    let btnBuscar = document.getElementById('btn');
    btnBuscar.classList.add('uk-disabled');
    btnBuscar.style.color='grey';
}

function activarBuscar(){
    let btnBuscar = document.getElementById('btn');
    btnBuscar.classList.remove('uk-disabled');
    btnBuscar.classList.add('uk-active');
    location.reload();
}

function mostrarFotos(){  
    // URL de la API para buscar imágenes (ejemplo: "naturaleza")
    let buscarPor = document.getElementById('nameFoto');
    let paginas = document.getElementById('numeroFotos');
    let a = buscarPor.value;
    let b= paginas.value;
    //console.log('buscarPor.value ' + buscarPor.value + '   ' + 'paginas.value ' + paginas.value);
    if(a.trim () === '' || b.trim() === ''){
        let menseaje = document.getElementById('pError');
        menseaje.style.color='Red';
        menseaje.classList=('uk-animation-slide-right');
        menseaje.innerHTML="Introduzca texto y/o número de fotos a buscar";
        return;
    }
    else{
            let menseaje = document.getElementById('pError');
            menseaje.innerHTML="";
            const query = buscarPor.value ;
            const perPage = paginas.value;
            console.log(query + ' ' + perPage);// Número de fotos a obtener
            const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${apiKey}`; 
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);  
                // Acceder a las imágenes

                data.results.forEach(photo => {
                //console.log(photo.urls.small); // URL de la imagen en tamaño pequeño
                //let insertar = document.getElementById('repositorioFotos');
                let insertar = document.getElementById('gallery');
                let nuevoDiv = document.createElement('div');
                let nuevaA = document.createElement('a');
                let nuevaImg = document.createElement('img');
                nuevaA.setAttribute('class','uk-inline');
                nuevaA.setAttribute('data-caption','Caption');
                nuevaA.setAttribute('href',photo.links.download);
                nuevaImg.setAttribute('src',photo.urls.small);
                nuevaImg.setAttribute('width','1000');
                nuevaImg.setAttribute('height','600');
                nuevaImg.setAttribute('alt','');
                nuevaA.appendChild(nuevaImg);
                nuevoDiv.appendChild(nuevaA);
                insertar.appendChild(nuevoDiv); 
                //console.log(photo);
                //console.log(photo.links.download)     
                 
                });

            })
            .then(() => {
                activaBtnBuscar();  
            })
            .catch(error => {
                console.error("Error al obtener datos:", error);
                let menseaje = document.getElementById('pError');
                menseaje.style.color='Red';
                menseaje.classList=('uk-animation-slide-right');
                menseaje.innerHTML="No ha sido posible conectar con el origen de datos, revise";
            });
            return;
        }
}

// PUNTO DE ENTRADA A AJAX (FETCH) CUANDO SE HACE CLICK EN EL BOTON
function inicio(){
    document.getElementById('btn').addEventListener('click',mostrarFotos,false);
    document.getElementById('btnBusqueda').addEventListener('click',activarBuscar,false);
}
  
  // PUNTO DE ENTRADA CON EL DOM CARGADO COMPLETAMENTE
  document.addEventListener('DOMContentLoaded', inicio, false);