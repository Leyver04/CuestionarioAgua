import { db, collection, addDoc } from './firebaseConfig.js';

let tiempoLimite = 300; // 5 minutos
let tiempoTranscurrido = 0;
let intervalo;
let aciertos = 0;

function iniciarCuestionario() {
    const nombre = document.getElementById('nombre').value;
    const grupo = document.getElementById('grupo').value;

    if (nombre && grupo) {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('cuestionario').style.display = 'block';
        iniciarTemporizador();
    } else {
        alert('Por favor, ingresa tu nombre y grupo.');
    }
}

function iniciarTemporizador() {
    intervalo = setInterval(() => {
        tiempoTranscurrido++;
        document.getElementById('tiempo').innerText = `Tiempo transcurrido: ${Math.floor(tiempoTranscurrido / 60)} minutos y ${tiempoTranscurrido % 60} segundos`;
        if (tiempoTranscurrido >= tiempoLimite) {
            clearInterval(intervalo);
            alert('Tiempo límite alcanzado.');
            finalizarCuestionario();
        }
    }, 1000);
}

function verificarRespuesta(pregunta, opcionCorrecta) {
    const opcionSeleccionada = document.querySelector(`input[name="${pregunta}"]:checked`);
    if (opcionSeleccionada && opcionSeleccionada.value === opcionCorrecta) {
        aciertos++;
    }
}

function finalizarCuestionario() {
    clearInterval(intervalo);
    const nombre = document.getElementById('nombre').value;
    const grupo = document.getElementById('grupo').value;
    const tiempo = Math.floor(tiempoTranscurrido / 60) + ' minutos y ' + (tiempoTranscurrido % 60) + ' segundos';

    verificarRespuesta('pregunta1', 'HTML'); // Ajusta según sea necesario

    guardarDatosEnFirebase(nombre, grupo, aciertos, tiempo);
}

function guardarDatosEnFirebase(nombre, grupo, aciertos, tiempo) {
    addDoc(collection(db, "registros"), {
        nombre,
        grupo,
        aciertos,
        tiempo
    })
        .then(() => {
            console.log("Datos guardados en Firebase");
            alert(`Cuestionario finalizado. Nombre: ${nombre}, Grupo: ${grupo}, Aciertos: ${aciertos}, Tiempo: ${tiempo}`);
        })
        .catch((error) => {
            console.error("Error al guardar datos:", error);
        });
}

// Hacer funciones accesibles globalmente
window.iniciarCuestionario = iniciarCuestionario;
window.finalizarCuestionario = finalizarCuestionario;
