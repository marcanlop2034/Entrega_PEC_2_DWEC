// 

function mostrarFotos(){
    const accessKey = "7NnttR8zRVI_HW0OlB4CN4k82TXHzWg1uBvEdWSIhMI"; // Reemplázalo con tu clave real
   
    // URL de la API para buscar imágenes (ejemplo: "naturaleza")
    let buscarPor = document.getElementById('nameFoto');
    let paginas = document.getElementById('numeroFotos');
    let a = buscarPor.value;
    let b= paginas.value;
    console.log('buscarPor.value ' + buscarPor.value + '   ' + 'paginas.value ' + paginas.value);
    if(a.trim () === '' || b.trim() === ''){
        let padre = document.getElementById('titulo');
        let hijo = document.createElement('p');
        let cerrar = document.createElement('a');
        cerrar.setAttribute('class','uk-alert-close');
        cerrar.setAttribute('uk-close','');
        hijo.innerHTML="Debe introducir texto y/o número de fotos";
        hijo.setAttribute('class','uk-alert-warning');
        padre.appendChild(cerrar);
        padre.appendChild(hijo);
        return;
    }
    else{
            const query = buscarPor.value ;
            const perPage = paginas.value;
            console.log(query + ' ' + perPage);// Número de fotos a obtener
            const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${accessKey}`;
            
        
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
                
                console.log(photo);
                console.log(photo.links.download)
                
                });
              

            })
            .catch(error => console.error("Error al obtener datos:", error));
            return;
        }
}

// PUNTO DE ENTRADA A AJAX (FETCH) CUANDO SE HACE CLICK EN EL BOTON
function inicio(){
    document.getElementById('btn').addEventListener('click',mostrarFotos,false);
  }
  
  // PUNTO DE ENTRADA CON EL DOM CARGADO COMPLETAMENTE
  document.addEventListener('DOMContentLoaded', inicio, false);