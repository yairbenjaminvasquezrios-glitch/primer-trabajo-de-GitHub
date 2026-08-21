const readline = require('readline-sync');//es aviso de un comando psoterior.esto hace q el sistema constantemente lea lo q ingresa el usuario y los guarde
let m = [], suma = 0;//dimension
for (let i = 0; i < 3; i++) {
    m[i] = [];//aca se va registrando las matrices x fila
    for (let j = 0; j < 4; j++) {
        m[i][j] = readline.questionInt(`Val [${i}][$
{j}]: `);//esto es un escribir y leer conjuntos
suma += m[i][j];// esto es un contador q va sumando el valor de todos los valores de la matriz
}
}
console.log(`
La suma total es: ${suma}`);//acumulador