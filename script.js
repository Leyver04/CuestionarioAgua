import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHQ0DcjS5rmfRHzCLBwuk0bPAb232cFAA",
    authDomain: "cuestionarioagua-40340.firebaseapp.com",
    projectId: "cuestionarioagua-40340",
    storageBucket: "cuestionarioagua-40340.firebasestorage.app",
    messagingSenderId: "90687273974",
    appId: "1:90687273974:web:6d03ff358e745275be65d7",
    measurementId: "G-7RKVQHRQ20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    db.collection("registros").add({
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

// Asignar funciones al objeto global
window.iniciarCuestionario = iniciarCuestionario;
window.finalizarCuestionario = finalizarCuestionario;
