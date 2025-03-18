import { API_KEY_NASA } from './config.js';
const apiKey = API_KEY_NASA; // Reemplaza con tu clave API de la NASA
let apodVisible = false;
let apodExplanationVisible = false;
let asteroidesVisible = false;
let marsPhotosVisible = false;

// Función para cargar y mostrar la Imagen Astronómica del Día (APOD)
function toggleAPOD() {
    const apodDiv = document.getElementById('apod');
    if (apodVisible) {
        apodDiv.innerHTML = '';
        apodVisible = false;
    } else {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                apodDiv.innerHTML = `
                    <h2>${data.title}</h2>
                    <img src="${data.url}" alt="Imagen Astronómica del Día">
                    <br>
                    <button class="details-button" onclick="verDetallesAPOD()">Ver más detalles</button>
                    <div id="apodDetails" style="display:none;">
                        <p>${data.explanation}</p>
                    </div>
                `;
            })
            .catch(error => {
                apodDiv.innerHTML = "Hubo un error al cargar la imagen.";
            });
        apodVisible = true;
    }
}

// Función para mostrar más detalles de la Imagen Astronómica del Día
function verDetallesAPOD() {
    if(apodExplanationVisible){
        const detailsDiv = document.getElementById('apodDetails');
        detailsDiv.style.display = 'none';
        apodExplanationVisible = false;
    } else {
        const detailsDiv = document.getElementById('apodDetails');
        detailsDiv.style.display = 'block';
        apodExplanationVisible = true;
    }
}

// Función para cargar y mostrar los Asteroides Cercanos
function toggleAsteroides() {
    const asteroidsDiv = document.getElementById('asteroids');
    if (asteroidesVisible) {
        asteroidsDiv.innerHTML = '';
        asteroidesVisible = false;
    } else {
        const startDate = '2025-03-13'; // Cambiar la fecha si es necesario
        const endDate = '2025-03-14'; // Cambiar la fecha si es necesario
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const asteroids = data.near_earth_objects;
                let html = `<h2>Asteroides Cercanos del ${startDate} al ${endDate}</h2>`;
                html += `<table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Distancia (km)</th>
                                    <th>Velocidad (km/h)</th>
                                    <th>Ver más</th>
                                </tr>
                            </thead>
                            <tbody>`;
                for (let date in asteroids) {
                    asteroids[date].forEach(asteroid => {
                        html += `
                            <tr>
                                <td>${asteroid.name}</td>
                                <td>${asteroid.close_approach_data[0].miss_distance.kilometers}</td>
                                <td>${asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</td>
                                <td><button onclick="verMasAsteroide('${asteroid.id}')">Ver más</button></td>
                            </tr>
                        `;
                    });
                }
                html += `</tbody></table>`;
                asteroidsDiv.innerHTML = html;
            })
            .catch(error => {
                asteroidsDiv.textContent = "Hubo un error al cargar los asteroides.";
            });
        asteroidesVisible = true;
    }
}

// Función para ver más detalles de un asteroide
function verMasAsteroide(asteroidId) {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            alert(`Detalles de ${data.name}:\n
                    Fecha de aproximación: ${data.close_approach_data[0].close_approach_date}\n
                    Distancia mínima: ${data.close_approach_data[0].miss_distance.kilometers} km\n
                    Velocidad relativa: ${data.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h`);
        })
        .catch(error => alert("Hubo un error al cargar los detalles del asteroide."));
}

// Función para cargar las Imágenes del Rover Curiosity en Marte
function toggleMarsRover() {
    const marsDiv = document.getElementById('marsPhotos');
    const photoCount = document.getElementById('photoCount').value;
    const sol = 1000; // Puedes cambiar el valor de sol para obtener fotos de otros días
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}&page=1`)
        .then(response => response.json())
        .then(data => {
            marsDiv.innerHTML = `<h2>Imágenes de Marte (Sol ${sol})</h2>`;
            const photosToShow = data.photos.slice(0, photoCount); // Limitar las fotos
            photosToShow.forEach(photo => {
                marsDiv.innerHTML += `<img src="${photo.img_src}" alt="Foto de Marte">`;
            });
            document.getElementById('hideMarsPhotosBtn').style.display = 'inline';
        })
        .catch(error => {
            marsDiv.textContent = "Hubo un error al cargar las imágenes de Marte.";
        });
    marsPhotosVisible = true;
}

// Función para ocultar las imágenes de Marte
function ocultarMarsFotos() {
    const marsDiv = document.getElementById('marsPhotos');
    marsDiv.innerHTML = '';
    document.getElementById('hideMarsPhotosBtn').style.display = 'none';
    marsPhotosVisible = false;
}

window.verDetallesAPOD=verDetallesAPOD;
window.verMasAsteroide=verMasAsteroide;
window.toggleAPOD=toggleAPOD;
window.toggleAsteroides=toggleAsteroides;
window.toggleMarsRover=toggleMarsRover;
window.ocultarMarsFotos=ocultarMarsFotos;