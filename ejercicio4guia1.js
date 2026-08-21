const readline = require('readline-sync');//es aviso de un comando psoterior.esto hace q el sistema constantemente lea lo q ingresa el usuario y los guarde
let temp = [];//dimension
for (let i = 0; i < 3; i++) {
    temp[i] = [];
    for (let j = 0; j < 3; j++) {
        temp[i][j] = readline.questionFloat(`Temp [${i}][${j}]: `);//esto es un escribir y leer conjuntos
    }
}
let max = temp[0][0];
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (temp[i][j] > max) max = temp[i][j];//este if hace q sucesivamente se vayan ingresaNDO LAS TEMPERATURAS hasta determinar cual es la mas alta
    }
}
console.log(`Temperatura máxima: ${max}°C`);//escribe la temperatura mas alta al finalizar los paras anteriores