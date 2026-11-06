let correctas = 0; 
let incorrectas = 0; 

// Creamos el panel de resultados
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

crearPanel();

function Pregunta(numPregunta, esCorrecta, mensaje) { 
    // 1. Buscamos la caja de la pregunta usando el número (id="p1", id="p2", etc.)
    let caja = document.getElementById('p' + numPregunta);
    let botones = caja.getElementsByTagName('button');

    // 2. Deshabilitamos los botones INMEDIATAMENTE para que no se pueda hacer doble clic
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    // 3. Evaluamos si es correcta o no
    if (esCorrecta) { 
        alert("¡GENIO! " + mensaje); 
        correctas++; 
    } else { 
        alert("Lo siento, respuesta incorrecta. (" + mensaje + ")"); 
        incorrectas++; 
    } 

    // 4. Calculamos el porcentaje sobre las respondidas
    let respondidas = correctas + incorrectas; 
    let porcentajeMal = 0; 

    if (respondidas > 0) { 
        porcentajeMal = (incorrectas / respondidas) * 100; 
    } 

    // 5. Mostramos los datos actualizados en el panel
    document.getElementById('ok').innerText = correctas; 
    document.getElementById('mal').innerText = incorrectas; 
    document.getElementById('porcentaje').innerText = porcentajeMal.toFixed(1) + "%"; 
}
