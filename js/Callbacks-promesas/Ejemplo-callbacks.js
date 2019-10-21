// Los callbacks son funciones que se llaman como argumentos dentro de otras funciones
// Ejemplo 1: Auto llamado sin parÃ¡metros

function ejemplo1(fn) {
    fn();
}
// Uso:
ejemplo1(function () {
    console.log("Saludo");
});

// Ejemplo 2: Autollamado con parÃ¡metros

function ejemplo2(fn) {
    var usuario = "nombre_usuario"; // Se asigna el nombre de usuario
    fn(usuario);
}
// Uso:
ejemplo2(function (nom) {
    console.log("hola " + nom); // Se crea una funciÃ³n anÃ³nima que imprime el nombre de usuario
});


// Ejemplo 3: Autollamado con parÃ¡metros

function ejemplo3(fn, usuario) {
    fn(usuario); // Se pone como parametro de la funcion, el parÃ¡metro de la funcion global
}

// Uso:
ejemplo3(function (nom) {
    console.log("hola " + nom); // Se crea una funciÃ³n anÃ³nima que imprime el nombre de usuario
}, "nombre_usuario");

// Ejercicio 1
// Crear una funciÃ³n que haga lo mismo que array.map() basado en callbacks


function mapear(array, funcion) {
    for(var i = 0; i< array.length; i++){
        array[i] = funcion(array[i]);
    }

}

// Uso
var array1 = mapear([1, 2, 3], function (a) {
    return a * 2;
});
//resultado esperado: [2, 4, 6]

///////////////////  OPERACIONES ASÃNCRONAS ///////////////////

//forma 1

function imprimir() {
    console.log("Hola 8 seg despuÃ©s!");
}

setTimeout(imprimir, 8000);


// Forma 2
setTimeout(function () {
    console.log("Hola 8 seg despuÃ©s!");
}, 8000)

// Forma 3

setTimeout(() => {
    console.log("Hola 8 seg despuÃ©s!");
}, 8000)


// Ejemplo 2

const games = [
    { id: 1, nombre: "killer instinct", casa_desarrollo: "Rare", tipo_id: 1 },
    { id: 2, nombre: "Mortal Kombat XI", casa_desarrollo: "NetherRealm", tipo_id: 1 },
    { id: 3, nombre: "Watch Dogs", casa_desarrollo: "Ubisoft", tipo_id: 2 }
]

const tipo = {
    1: "Lucha",
    2: "Acción/Aventura"
}


function getGames(callback) {// Este callback se va a invocar cuÃ¡ndo se carguen los juegos de la base de datos
    setTimeout(() => { // Espera que transcurra una cantidad determinada de milisegundos antes de ejecutar una funciÃ³n
        callback(null, games); // Se invoca el callback que pasamos como parÃ¡metro en los juegos. En general, el primer parÃ¡metro es un error, si no hay error es null.
    }, 2000);
}

// Ejercicio 1

function getGames(callback) {
    setTimeout(() => {
        callback(null, games); // null, en general se colocan parametros para poder retornar cosas especificas en caso de tener un error
    }, 200);
}

getGames((err, games) => console.log(games))// Uso del callback anterior

// Ejercicio 2 Â¿QuÃ© hace esta linea de cÃ³digo?

id_busqueda = 1
games.filter((game) => game.id === id_busqueda)[0]
// filtra el juego que tenga el id como id_busqueda
// Recorre todos los usuarios y cuÃ¡ndo encuentra el usuario con el id especifico lo recibe

// Ejercicio 3
// Crear un mÃ©todo que retorne un tipo de juego especifico con un retraso de 1 seg usando callbacks

// Borrar //
function getGame(id, callback) {
    var id_busqueda = id;
    
    setTimeout(() =>{ callback(null, games.filter((game) => game.id === id_busqueda)[0]) }, 1000)
}

getGame(1, (err, game) => console.log(game)) // Para obtener el juego con id 1

// Ejercicio 4
// Esta funciÃ³n obetiene la informaciÃ³n de un tipo de juego especifico
function getTipo(id, callback) {
    var id_busqueda = id;
    
    setTimeout(() =>{ callback(null, tipo[games.filter((game) => game.tipo_id === id_busqueda)[0].tipo_id]) }, 1000)
}

getTipo(2, (err, game) => console.log(game)) // Para obtener el juego con id 1


// Queremos saber el tipo de Mortal Kombat 

// Pasos:

// Pedir todos los juegos
// Con el id de Mortal, lo pedimos individualmente
// Luego, pedirmos su tipo

getGames((err, games) => {
    let Mortal_id = games[1].id;

    getGame(Mortal_id, (game) => {
        let tipoId = game.tipo_id;

        getTipo(tipoId, (err, tipo) => {
            console.log("El tipo de Mortal Kombat es: " + tipo);
        })
    })
})



//---------------------------EJERCICIO1-----------------