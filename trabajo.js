// Crear el botón
const boton = document.createElement("button");
boton.textContent = "NO TOCAR";
boton.style.padding = "12px 24px";
boton.style.fontSize = "16px";
boton.style.cursor = "pointer";
document.body.appendChild(boton);

// Configurar animación suave de 1.5 segundos
document.body.style.transition = "transform 1.5s ease-in-out";
document.body.style.minHeight = "100vh";

let grados = 0;

// Evento para sumar 3 vueltas (1080 grados) en cada clic
boton.addEventListener("click", () => {
    grados += 1080; // 360 grados x 3 vueltas
    document.body.style.transform = `rotate(${grados}deg)`;
});
boton.style.backgroundColor = "#ff4757"; // Color de fondo
boton.style.color = "#ffffff";           // Color del texto

