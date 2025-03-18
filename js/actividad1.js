'use strict';

function ocultarPrincipal(){
    let principal = document.getElementById('principal');
    principal.setAttribute('hidden','');
    let detalle = document.getElementById('detalle');
    detalle.removeAttribute('hidden');
}

function oculatarDetalle(){
    let principal = document.getElementById('principal');
    principal.removeAttribute('hidden');
    let detalle = document.getElementById('detalle');
    detalle.setAttribute('hidden','');
    let nombre = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    nombre.innerHTML='';
    email.innerHTML='';
    phone.innerHTML='';

}

 function muestraCard(data){
    let nombre = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    nombre.innerHTML=data.name;
    email.innerHTML=data.email;
    phone.innerHTML=data.phone;
    console.log(data.name);
}

function mostrarDetalles(id){
   ocultarPrincipal();
   let url = 'https://jsonplaceholder.typicode.com/users/'+id;
   fetch(url)
    .then(response=> response.json())
    .then(data => {
        console.log(data);
        muestraCard(data);
    })

}

// FUNCION QUE INSERTA LOS ELEMENTOS EN EL DOM.
function insertaElementos(data){
    
    let repositorio = document.getElementById('bodyTable');
    for(let x=0; x < data.length; x++){
        let elementoTr = document.createElement('tr');

        let elementoTdName = document.createElement('td');
        elementoTdName.innerHTML=data[x].name;
        elementoTr.appendChild(elementoTdName);
        console.log(data[x].name);

        let elementoTdEmail = document.createElement('td');
        elementoTdEmail.innerHTML = data[x].email;
        elementoTr.appendChild(elementoTdEmail);
        console.log(data[x].email);

        let elementoTdDir = document.createElement('td');
        elementoTdDir.innerHTML=data[x].address.city;    
        elementoTr.appendChild(elementoTdDir);
        console.log(data[x].address.city);
        
        let elementoTdBtn = document.createElement('td');
        let elementoBtn = document.createElement('a');
        elementoBtn.classList.add('uk-link-tex');
        elementoBtn.href= ''//data[x].id;
        elementoBtn.setAttribute('uk-icon','info');
        elementoBtn.setAttribute('title','Ver Detalles');
        elementoBtn.innerHTML='';
        // Agregar evento al botón
        elementoBtn.addEventListener('click', function() {
            event.preventDefault(); // Evita la navegación si es necesario
            console.log('Botón clicado con ID:', data[x].id);
            mostrarDetalles(data[x].id);
            // Aquí puedes llamar a otra función para manejar la acción
        });
        elementoTdBtn.appendChild(elementoBtn);
        elementoTr.appendChild(elementoTdBtn);

        repositorio.appendChild(elementoTr);

        
    }
}

// FUNCION AJAX 
function mostrarUsuario(){
    oculatarDetalle();
 
    let numUsuarios = document.getElementsByTagName('td');
    if (numUsuarios.length == 0) {
    try{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            insertaElementos(data);
            })
    }
    catch(e){
        let repositorio = document.getElementById('bodyTable');
        repositorio.innerHTML=e;
        console.log(e);  
    }
    }
}

// PUNTO DE ENTRADA A AJAX (FETCH) CUANDO SE HACE CLICK EN EL BOTON
function inicio(){
  document.getElementById('btn').addEventListener('click',mostrarUsuario,false);
}

// PUNTO DE ENTRADA CON EL DOM CARGADO COMPLETAMENTE
document.addEventListener('DOMContentLoaded', inicio, false);