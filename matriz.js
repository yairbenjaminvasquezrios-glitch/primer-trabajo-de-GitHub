let correctas = 0; 
let incorrectas = 0; 

// Creamos la estructura HTML del panel mediante JavaScript al cargar la página
function crearPanel() {
    const contenedor = document.getElementById('contenedor-panel');
    contenedor.innerHTML = `
        <div class="marcador-box"> 
            <h3>Panel de Resultados</h3> 
            <p>Respuestas correctas: <strong id="ok" style="color: green;">0</strong></p> 
            <p>Respuestas incorrectas: <strong id="mal" style="color: red;">0</strong></p> 
            <p>Porcentaje de errores: <strong id="porcentaje">0%</strong></p> 
        </div>
    `;
}

// Ejecutamos la función para que el panel aparezca desde el principio
crearPanel();

function responder(numPregunta, esCorrecta, mensaje) { 
    if (esCorrecta) { 
        alert("¡GENIO! " + mensaje); 
        correctas++; 
    } else { 
        alert("Lo siento, respuesta incorrecta. (" + mensaje + ")"); 
        incorrectas++; 
    } 

    let respondidas = correctas + incorrectas; 
    let porcentajeMal = 0; 

    if (respondidas > 0) { 
        porcentajeMal = (incorrectas / respondidas) * 100; 
    } 

    // Actualizamos los valores dentro del HTML generado
    document.getElementById('ok').innerText = correctas; 
    document.getElementById('mal').innerText = incorrectas; 
    document.getElementById('porcentaje').innerText = porcentajeMal.toFixed(1) + "%"; 

    // Deshabilitamos los botones de esta pregunta
    let caja = document.getElementById('p' + numPregunta); 
    let botones = caja.getElementsByTagName('button'); 
    for (let i = 0; i < botones.length; i++) { 
        botones[i].disabled = true; 
    } 
}
