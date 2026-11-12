// Crear y configurar el canvas dinámicamente desde JS
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 500;
canvas.style.border = "3px solid white";
canvas.style.display = "block";
canvas.style.margin = "20px auto";
document.body.style.backgroundColor = "#1a1a1a";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let puntos = 0;

// Paleta del jugador (izquierda)
const jugador = {
    x: 15,
    y: canvas.height / 2 - 50,
    ancho: 12,
    alto: 100,
    color: "white"
};

// Pared que suma puntos (derecha)
const pared = {
    x: canvas.width - 15,
    y: 0,
    ancho: 15,
    alto: canvas.height,
    color: "#ff4757"
};

// Pelota
const pelota = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radio: 10,
    velocidad: 7,
    velocidadX: 7,
    velocidadY: 5,
    color: "#00ffcc"
};

// Control con el mouse
canvas.addEventListener("mousemove", (evt) => {
    const rect = canvas.getBoundingClientRect();
    jugador.y = evt.clientY - rect.top - jugador.alto / 2;
});

// Funciones de dibujo
function dibujarRectangulo(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function dibujarCirculo(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function dibujarTexto(texto, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.textAlign = "center";
    ctx.fillText(texto, x, y);
}

// Reiniciar pelota y puntos si se te escapa
function reiniciarJuego() {
    puntos = 0;
    pelota.x = canvas.width / 2;
    pelota.y = canvas.height / 2;
    pelota.velocidad = 7;
    pelota.velocidadX = 7;
    pelota.velocidadY = 5;
}

// Detección de colisión con la paleta
function detectarColision(b, p) {
    return (
        b.x - b.radio < p.x + p.ancho &&
        b.x + b.radio > p.x &&
        b.y - b.radio < p.y + p.alto &&
        b.y + b.radio > p.y
    );
}

// Lógica y movimiento
function actualizar() {
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;

    // Rebote en techo y piso (sin sumar puntos)
    if (pelota.y + pelota.radio >= canvas.height) {
        pelota.y = canvas.height - pelota.radio;
        pelota.velocidadY = -pelota.velocidadY;
    } else if (pelota.y - pelota.radio <= 0) {
        pelota.y = pelota.radio;
        pelota.velocidadY = -pelota.velocidadY;
    }

    // Choque contra la PARED DERECHA -> SUMA 1 PUNTO
    if (pelota.x + pelota.radio >= pared.x) {
        pelota.x = pared.x - pelota.radio;
        pelota.velocidadX = -pelota.velocidadX;
        puntos++;
    }

    // Si pasa de largo a la izquierda -> se reinicia
    if (pelota.x - pelota.radio < 0) {
        reiniciarJuego();
    }

    // Rebote en la paleta del jugador (sin sumar puntos)
    if (detectarColision(pelota, jugador)) {
        let puntoChoque = (pelota.y - (jugador.y + jugador.alto / 2)) / (jugador.alto / 2);
        const anguloRad = (Math.PI / 4) * puntoChoque;

        pelota.velocidadX = pelota.velocidad * Math.cos(anguloRad);
        pelota.velocidadY = pelota.velocidad * Math.sin(anguloRad);
        pelota.velocidad += 0.2;
    }
}

// Renderizar en pantalla
function renderizar() {
    dibujarRectangulo(0, 0, canvas.width, canvas.height, "black");
    dibujarTexto(puntos, canvas.width / 2, 70);
    dibujarRectangulo(jugador.x, jugador.y, jugador.ancho, jugador.alto, jugador.color);
    dibujarRectangulo(pared.x, pared.y, pared.ancho, pared.alto, pared.color);
    dibujarCirculo(pelota.x, pelota.y, pelota.radio, pelota.color);
}

// Bucle principal (60 FPS)
setInterval(() => {
    actualizar();
    renderizar();
}, 1000 / 60);
