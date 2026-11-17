// 1. Crear el botón original
const boton = document.createElement("button");
boton.textContent = "NO TOCAR";
boton.style.padding = "12px 24px";
boton.style.fontSize = "16px";
boton.style.cursor = "pointer";
boton.style.backgroundColor = "#ff4757";
boton.style.color = "#ffffff";
boton.style.border = "none";
boton.style.borderRadius = "6px";
boton.style.position = "relative";
boton.style.zIndex = "10000";
document.body.appendChild(boton);

let enCurso = false;

// 2. Preparar las palabras sin alterar el diseño
function prepararPalabras() {
  if (document.querySelector(".palabra-destructible")) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const nodosTexto = [];
  let nodo;

  while ((nodo = walker.nextNode())) {
    if (
      nodo.nodeValue.trim() !== "" &&
      nodo.parentElement.tagName !== "SCRIPT" &&
      nodo.parentElement.tagName !== "STYLE" &&
      nodo.parentElement !== boton
    ) {
      nodosTexto.push(nodo);
    }
  }

  nodosTexto.forEach((nodoTexto) => {
    const palabras = nodoTexto.nodeValue.split(/(\s+)/);
    const fragmento = document.createDocumentFragment();

    palabras.forEach((palabra) => {
      if (palabra.trim() === "") {
        fragmento.appendChild(document.createTextNode(palabra));
      } else {
        const span = document.createElement("span");
        span.textContent = palabra;
        span.style.display = "inline-block";
        span.classList.add("palabra-destructible");
        fragmento.appendChild(span);
      }
    });

    nodoTexto.parentNode.replaceChild(fragmento, nodoTexto);
  });
}

// 3. Destello nuclear gigante en la pantalla
function destelloNuclear() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.top = "0";
  flash.style.left = "0";
  flash.style.width = "100vw";
  flash.style.height = "100vh";
  flash.style.backgroundColor = "#ffffff";
  flash.style.zIndex = "99999";
  flash.style.transition = "opacity 1.5s ease-out";
  document.body.appendChild(flash);

  requestAnimationFrame(() => {
    flash.style.opacity = "0";
  });

  setTimeout(() => flash.remove(), 1500);
}

// 4. Crear nube de hongo nuclear con emojis y ondas
function hongoNuclear() {
  const rect = boton.getBoundingClientRect();
  const centroX = rect.left + rect.width / 2;
  const centroY = rect.top + rect.height / 2;

  const hongo = document.createElement("div");
  hongo.textContent = "🍄💥";
  hongo.style.position = "fixed";
  hongo.style.left = `${centroX}px`;
  hongo.style.top = `${centroY}px`;
  hongo.style.fontSize = "10px";
  hongo.style.transform = "translate(-50%, -50%) scale(0)";
  hongo.style.transition = "all 1s cubic-bezier(0.1, 0.9, 0.2, 1)";
  hongo.style.zIndex = "99998";
  hongo.style.pointerEvents = "none";
  document.body.appendChild(hongo);

  requestAnimationFrame(() => {
    hongo.style.fontSize = "150px";
    hongo.style.transform = `translate(-50%, -150%) scale(2) rotate(360deg)`;
    hongo.style.opacity = "0";
  });

  setTimeout(() => hongo.remove(), 1200);
}

// 5. Destruir y luego reconstruir
function destruirYReconstruir() {
  prepararPalabras();
  destelloNuclear();
  hongoNuclear();

  const todasLasPalabras = document.querySelectorAll(".palabra-destructible");

  todasLasPalabras.forEach((span) => {
    const retraso = Math.random() * 0.4;
    const duracion = 1.2 + Math.random() * 0.8;

    span.style.transition = `transform ${duracion}s cubic-bezier(0.55, 0.085, 0.68, 0.53) ${retraso}s, opacity ${duracion}s ease-in ${retraso}s`;

    const impulsoX = (Math.random() - 0.5) * 700;
    const caidaY = window.innerHeight + 150;
    const giro = (Math.random() - 0.5) * 1080;

    requestAnimationFrame(() => {
      span.style.transform = `translate(${impulsoX}px, ${caidaY}px) rotate(${giro}deg)`;
      span.style.opacity = "0";
    });
  });

  // Reconstrucción a los 2.8 segundos
  setTimeout(() => {
    todasLasPalabras.forEach((span) => {
      const retraso = Math.random() * 0.4;
      span.style.transition = `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${retraso}s, opacity 0.8s ease-out ${retraso}s`;
      span.style.transform = "translate(0px, 0px) rotate(0deg)";
      span.style.opacity = "1";
    });

    setTimeout(() => {
      enCurso = false;
    }, 1600);
  }, 2800);
}

// 6. Evento principal al hacer clic
boton.addEventListener("click", () => {
  if (enCurso) return;
  enCurso = true;

  const overflowOriginal = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.body.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;

  destruirYReconstruir();

  let paso = 0;
  const intervalo = setInterval(() => {
    paso++;
    const progreso = paso / 30;
    const giroActual = 1080 * progreso;
    const temblorX = (Math.random() - 0.5) * 50; // Sacudida más fuerte (onda expansiva)
    const temblorY = (Math.random() - 0.5) * 50;

    document.body.style.transform = `translate(${temblorX}px, ${temblorY}px) rotate(${giroActual}deg)`;

    if (paso >= 30) {
      clearInterval(intervalo);
      document.body.style.transform = "";
      document.body.style.transformOrigin = "";
      document.body.style.overflow = overflowOriginal;
    }
  }, 50);
});
