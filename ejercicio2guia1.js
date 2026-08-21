const readline = require('readline-sync');//es aviso de un comando psoterior.esto hace q el sistema constantemente lea lo q ingresa el usuario y los guarde
let ventas = [];//dimension
for (let i = 0; i < 3; i++) {//matriz.length no esta ya q los valores no estan puestos antes de iniciar esta ejecucion
    ventas[i] = [];//
    for (let j = 0; j < 3; j++) {
        ventas[i][j] = readline.questionInt(//esto es igual a un escribir y leer conjuntos
            `Venta Negocio ${i+1}, Dia ${j+1}: `//esto es un contador q guarda los valores de la matriz
        );
    }
}
console.log("--- Matriz de Ventas ---");//escribir
for (let i = 0; i < 3; i++) {
console.log(ventas[i].join(" "));//esto hace que al ejecutar el codigo se muestren las ventas por fila(osea,las ventas de cada negocio) y tambien agrega elespacio entre las matrices
}