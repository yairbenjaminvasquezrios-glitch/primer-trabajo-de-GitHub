const canvas = document.getElementById("pantalla");
const ctx = canvas.getContext("2d");

let ronda = 1, bloqueado = false, temblor = 0;
let parryActivo = false, parryBien = false, parryMal = false;
let msg = "RONDA 1 - ELIGE TU MOVIMIENTO";
let particulas = [], textos = [];

const colores = [
  { c: "#388e3c", cab: "#4caf50", nom: "ORCO" },
  { c: "#b71c1c", cab: "#e53935", nom: "DEMONIO" },
  { c: "#4a148c", cab: "#8e24aa", nom: "ESPECTRO" },
  { c: "#e65100", cab: "#fb8c00", nom: "TITAN" }
];

let p1 = { x: 180, y: 240, bx: 180, hp: 100, max: 100, golpe: 0, escudo: 0 };
let p2 = { x: 580, y: 240, bx: 580, hp: 100, max: 100, golpe: 0, dMin: 10, dMax: 20, est: colores };

document.addEventListener("keydown", e => { if (e.code === "Space") { e.preventDefault(); intentarParry(); } });

function fx(x, y, col, cant, txt, tCol) {
  for (let i = 0; i < cant; i++) {
    particulas.push({ x, y, vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12, v: 25, col });
  }
  if (txt) textos.push({ x, y: y - 60, txt, col: tCol, v: 40 });
}

function botones(off) {
  ["btn-atacar", "btn-especial", "btn-curar"].forEach(id => document.getElementById(id).disabled = off);
}

function turnoJugador(tipo) {
  if (bloqueado || p1.hp <= 0 || p2.hp <= 0) return;
  bloqueado = true; botones(true);

  if (tipo === "curar") {
    let cura = Math.floor(Math.random() * 11) + 15;
    p1.hp = Math.min(p1.max, p1.hp + cura);
    fx(p1.x, p1.y, "#4caf50", 20, `+${cura}`, "#69f0ae");
    msg = `Te curaste ${cura} de vida`;
    setTimeout(checkTurno, 400);
    return;
  }

  p1.x = 480;
  setTimeout(() => {
    if (tipo === "atacar") {
      let d = Math.floor(Math.random() * 11) + 12;
      p2.hp = Math.max(0, p2.hp - d); p2.golpe = 10; temblor = 10;
      fx(p2.x, p2.y, "#ff3333", 20, `-${d}`, "#ff5252");
      msg = `Atacaste por ${d} de dano`;
    } else if (Math.random() < 0.65) {
      let d = Math.floor(Math.random() * 16) + 22;
      p2.hp = Math.max(0, p2.hp - d); p2.golpe = 15; temblor = 18;
      fx(p2.x, p2.y, "#ff9800", 35, `-${d} CRITICO`, "#ffb74d");
      msg = `ESPECIAL CRITICO (-${d})`;
    } else {
      fx(p2.x, p2.y, "#ccc", 5, "FALLO", "#ccc");
      msg = "El ataque especial fallo";
    }
    p1.x = p1.bx;
    checkTurno();
  }, 200);
}

function checkTurno() {
  if (p2.hp <= 0) {
    ronda++;
    msg = `VICTORIA - SUBIENDO A RONDA ${ronda}`;
    p1.hp = Math.min(p1.max, p1.hp + 25);
    fx(p2.x, p2.y, "#ffd700", 40, "+25 PREMIO", "#69f0ae");
    setTimeout(() => {
      p2.est = colores[(ronda - 1) % colores.length];
      p2.max = 100 + (ronda - 1) * 35; p2.hp = p2.max;
      p2.dMin += 3; p2.dMax += 4;
      msg = `RONDA ${ronda}: APARECE ${p2.est.nom}`;
      bloqueado = false; botones(false);
    }, 1300);
  } else {
    setTimeout(turnoEnemigo, 600);
  }
}

function turnoEnemigo() {
  parryBien = false; parryMal = false;
  msg = `TURNO DE ${p2.est.nom}`; 
  p2.x = 340;

  // Se activa la ventana de parry en secreto sin cambiar el texto ni la pantalla
  setTimeout(() => { if (!parryMal) { parryActivo = true; } }, 500);

  setTimeout(() => {
    parryActivo = false; p2.x = 260;
    if (parryBien) {
      let d = 25 + ronda * 3;
      p2.hp = Math.max(0, p2.hp - d); p2.golpe = 15; temblor = 16;
      fx(p2.x, p2.y, "#ffd700", 30, `-${d} PARRY`, "#ffd700");
      msg = `PARRY PERFECTO Contraatacas por ${d}`;
    } else {
      let d = Math.floor(Math.random() * (p2.dMax - p2.dMin + 1)) + p2.dMin;
      p1.hp = Math.max(0, p1.hp - d); p1.golpe = 10; temblor = 12;
      fx(p1.x, p1.y, "#ff3333", 20, `-${d}`, "#ff5252");
      msg = `El ${p2.est.nom} te golpea por ${d}`;
    }

    setTimeout(() => {
      p2.x = p2.bx;
      if (p2.hp <= 0) checkTurno();
      else if (p1.hp <= 0) {
        msg = `DERROTADO EN RONDA ${ronda}`;
        document.getElementById("btn-reiniciar").style.display = "inline-block";
        document.getElementById("btn-parry").disabled = true;
      } else {
        bloqueado = false; botones(false);
      }
    }, 300);
  }, 1050);
}

function intentarParry() {
  if (!bloqueado || parryBien || parryMal || p1.hp <= 0 || p2.hp <= 0) return;
  p1.escudo = 15;
  if (parryActivo) {
    parryBien = true; parryActivo = false;
    fx(p1.x + 30, p1.y, "#00e5ff", 25, "BLOQUEADO", "#00e5ff");
  } else {
    parryMal = true;
    fx(p1.x, p1.y, "#999", 5, "FALLO", "#999");
  }
}

function reiniciarJuego() {
  ronda = 1; p1.hp = 100; p2.est = colores; p2.max = 100; p2.hp = 100; p2.dMin = 10; p2.dMax = 20;
  bloqueado = false; msg = "RONDA 1 - NUEVO COMBATE";
  document.getElementById("btn-reiniciar").style.display = "none";
  document.getElementById("btn-parry").disabled = false;
  botones(false);
}

function dibujar() {
  ctx.save();
  if (temblor > 0) { ctx.translate((Math.random() - 0.5) * temblor, (Math.random() - 0.5) * temblor); temblor--; }
  ctx.clearRect(0, 0, 800, 400);

  ctx.fillStyle = "#ffd700"; ctx.font = "bold 22px Arial"; ctx.textAlign = "center";
  ctx.fillText(`RONDA ${ronda}`, 400, 35);

  barra(50, 45, p1.hp, p1.max, "HEROE");
  barra(450, 45, p2.hp, p2.max, p2.est.nom);

  ctx.fillStyle = "white";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center"; ctx.fillText(msg, 400, 110);

  // Heroe
  ctx.save(); ctx.translate(p1.x, p1.y);
  ctx.fillStyle = p1.golpe-- > 0 ? "#fff" : "#2196f3"; ctx.fillRect(-20, -20, 40, 50);
  ctx.fillStyle = "#ffcc80"; ctx.beginPath(); ctx.arc(0, -35, 18, 0, 7); ctx.fill();
  ctx.fillStyle = "#e53935"; ctx.fillRect(-18, -42, 36, 7);
  ctx.fillStyle = "#cfd8dc"; ctx.fillRect(22, -45, 8, 55);
  if (p1.escudo-- > 0) {
    ctx.strokeStyle = parryBien ? "#ffd700" : "#00e5ff"; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(10, -10, 55, -1.5, 1.5); ctx.stroke();
  }
  ctx.restore();

  // Enemigo
  ctx.save(); ctx.translate(p2.x, p2.y);
  let esc = Math.min(1.35, 1 + (ronda - 1) * 0.06); ctx.scale(esc, esc);
  ctx.fillStyle = p2.golpe-- > 0 ? "#fff" : p2.est.c; ctx.fillRect(-30, -35, 60, 65);
  ctx.fillStyle = p2.est.cab; ctx.fillRect(-22, -65, 44, 30);
  ctx.fillStyle = "#ff1744"; ctx.fillRect(-15, -55, 8, 6); ctx.fillRect(3, -55, 8, 6);
  ctx.fillStyle = "#5d4037"; ctx.fillRect(-45, -20, 12, 50);
  ctx.restore();

  particulas.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, 6, 6);
    if (--p.v <= 0) particulas.splice(i, 1);
  });

  textos.forEach((t, i) => {
    t.y--; ctx.fillStyle = t.col; ctx.font = "bold 24px Arial"; ctx.fillText(t.txt, t.x, t.y);
    if (--t.v <= 0) textos.splice(i, 1);
  });

  ctx.restore();
  requestAnimationFrame(dibujar);
}

function barra(x, y, hp, max, nom) {
  ctx.fillStyle = "white"; ctx.font = "bold 16px Arial"; ctx.textAlign = "left";
  ctx.fillText(`${nom}: ${hp}/${max}`, x, y - 8);
  ctx.fillStyle = "#333"; ctx.fillRect(x, y, 300, 22);
  ctx.fillStyle = hp / max > 0.5 ? "#4caf50" : hp / max > 0.25 ? "#ff9800" : "#f44336";
  ctx.fillRect(x, y, 300 * (hp / max), 22);
  ctx.strokeStyle = "white"; ctx.strokeRect(x, y, 300, 22);
}

dibujar();
