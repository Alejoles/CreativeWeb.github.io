// Sintaxis
new promise(/*Funcion ejecutora*/ function (resolved, reject) { })

promise.prototype.then() // QuÃ© hacer en caso de exito
promise.prototype.catch()// QuÃ© hacer en caso de fracaso

    .then(onFulfillment)

// Pasar de Callbacks a funciones

// Obtener los juegos
function getGames(callback) {
    setTimeout(() => {
        callback(null, games);
    }, 200);
}

function getGames() {
    return new Promise((resolved, reject) => {
        setTimeout(() => {
            resolved(games); // Se retorna una promesa
        }, 200);
    })
}

// Uso
getGames().then((juegos) => console.log(juegos))

// Obtener un juego
function getGame(id, callback) {
    setTimeout(() => {
        callback(null, games.filter((game) => game.id === id)[0])
    }, 100)
}

function getGame(id) {
   return new Promise((resolved ,reject) =>{
       setTimeout(() => {
        resolved(games.filter((game) => game.id === id)[0]);
       }
       )
   })
}

// Uso
getGame(1).then((juego) => console.log(juego))


// Ejercicio: Hacer una promesa para retornar el tipo del juego

function getTipo(id, callback) {
    setTimeout(() => {
        callback(null, tipo[id])
    }, 100)
}


function getTipo(id) {
    return new Promise((resolved,reject) => {
    setTimeout(() => {
        resolved(tipo[id])
    },1000)

})

}

// Uso:
getTipo(1).then((some) => console.log(some))

// Consultar el tipo de Mortal Kombat

getGames()
    .then((games) => getGame(games[1].id))
    .then((game) => getTipo(game.tipo_id))
    .then((tipo) => console.log("El tipo de Mortal Kombat es ", tipo))

// Ejemplo: Imprimir el primer y segundo tipo de Video Juego usando promesas

getTipo(1)
    .then((tipo) => console.log(tipo))
    .then(() => getTipo(2))
    .then((tipo) => console.log(tipo))

Promise.all([getTipo(1), getTipo(2)])
    .then((tipo) => console.log(tipo))


// Promise.race

var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "uno");
});

var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "dos");
});

Promise.race([p1, p2]).then(value => {
    console.log(value); // "dos"
    // Ambas se resuelven, pero la p2 antes.
});


// Ejemplo con un resolve y un reject en el mismo mÃ©todo race.
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "tres");
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(reject, 500, "cuatro");
});

Promise.race([p3, p4]).then(value => {
    console.log(value); // "tres"
    // p3 es mas rÃ¡pida, asÃ­ que se resuelve el race
}, reason => {
    // No es llamado
});



var p5 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "cinoc");
});
var p6 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "seis");
});

Promise.race([p5, p6]).then(value => {
    // No es llamado
}, reason => {
    console.log(reason); // "seis"
    // p6 es mas rÃ¡pida, asÃ­ que se rechaza
});