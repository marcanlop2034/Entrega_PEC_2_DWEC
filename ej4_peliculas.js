import { API_KEY_OMDBAPI } from './config.js';
const apiKey = API_KEY_OMDBAPI; // Reemplaza con tu clave API de la OMDBAPI


// Función para buscar películas
function buscarPeliculas() {
    const termino = document.getElementById("searchTerm").value;
    if (!termino) {
        document.getElementById("mensaje").textContent = "Por favor, ingresa un título de película.";
        return;
    }

    document.getElementById("tablaResultados").style.display = 'none';
    document.getElementById("spinner").style.display = 'block'; // Mostrar spinner

    fetch(`https://www.omdbapi.com/?s=${termino}&apikey=${apiKey}&r=json`)
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("Error al obtener las películas");
            return respuesta.json();
        })
        .then(data => {
            if (data.Response === "True") {
                mostrarPeliculas(data.Search);
            } else {
                document.getElementById("mensaje").textContent = "No se encontraron películas.";
            }
        })
        .catch(error => {
            document.getElementById("mensaje").textContent = error.message;
        })
        .finally(() => {
            document.getElementById("spinner").style.display = 'none'; // Ocultar spinner
        });
}

// Función para mostrar películas en la tabla
function mostrarPeliculas(peliculas) {
    const tabla = document.getElementById("tablaPeliculas");
    tabla.innerHTML = '';
    peliculas.forEach(pelicula => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${pelicula.Title}</td>
                    <td>${pelicula.Year}</td>
                    <td><img src="${pelicula.Poster}" alt="${pelicula.Title}" width="80"></td>
                    <td><button onclick="verDetalles('${pelicula.imdbID}')">Ver más</button></td>
                `;
        tabla.appendChild(fila);
    });

    document.getElementById("tablaResultados").style.display = 'block';
}

// Función para obtener más detalles de una película
function verDetalles(imdbID) {
    document.getElementById("detalles").innerHTML = ''; // Limpiar detalles previos
    // document.getElementById("spinner").style.display = 'block'; // Mostrar spinner

    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&r=json`)
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("Error al obtener los detalles de la película");
            return respuesta.json();
        })
        .then(data => {
            mostrarDetalles(data);

            // Desplazar la página a la sección de detalles una vez los datos estén cargados
            setTimeout(() => {
                // Utilizamos scrollIntoView para desplazar la página al div de detalles
                document.getElementById("detalles").scrollIntoView({ behavior: 'smooth' });
            }, 500); // Esperamos un poco para asegurarnos de que los detalles estén listos
        })
        .catch(error => {
            document.getElementById("mensaje").textContent = error.message;
        })
        .finally(() => {
            document.getElementById("spinner").style.display = 'none'; // Ocultar spinner
        });
}


// Función para mostrar los detalles de la película
function mostrarDetalles(pelicula) {
    const detallesDiv = document.getElementById("detalles");
    detallesDiv.innerHTML = `
                <h2>${pelicula.Title} (${pelicula.Year})</h2>
                <img src="${pelicula.Poster}" alt="${pelicula.Title}">
                <p><strong>Género:</strong> ${pelicula.Genre}</p>
                <p><strong>Duración:</strong> ${pelicula.Runtime}</p>
                <p><strong>Director:</strong> ${pelicula.Director}</p>
                <p><strong>Escritores:</strong> ${pelicula.Writer}</p>
                <p><strong>Actores:</strong> ${pelicula.Actors}</p>
                <p><strong>Sinopsis:</strong> ${pelicula.Plot}</p>
                <p><strong>Calificación IMDb:</strong> ${pelicula.imdbRating}</p>
                <p><strong>Premios:</strong> ${pelicula.Awards}</p>
            `;
}

window.buscarPeliculas = buscarPeliculas;
window.verDetalles = verDetalles;