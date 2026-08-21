const readline = require('readline-sync');//es aviso de un comando psoterior.esto hace q el sistema constantemente lea lo q ingresa el usuario y los guarde
let m = [], ceros = 0;
for (let i = 0; i < 4; i++) {
    m[i] = [];
    for (let j = 0; j < 2; j++) {
        m[i][j] = readline.questionInt(`Num [${i}][${j}]: `);//esto es un ecribir y leer conjuntos
        if (m[i][j] === 0) ceros++;//esto hace q si el valor de un elemento es cero lo cuente
    }
}
console.log(`Cantidad de ceros ingresados: ${ceros}`);//escribe la cantidad de elementos de la matriz cuyo valor es cero