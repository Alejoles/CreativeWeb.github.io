var request = new XMLHttpRequest();

request.open('GET', 'data.json', true);

request.onload = function() {
    var data= JSON.parse(this.response);    // this se refiere al request en este contexto
    console.log(data);                      // Podemos ver los datos
    for( vari = 0; i< data.length; i++){
        console.log(data[i].name+ ' isa ' + data[i].race+ '.'); // Se imprimen llaves y valores en la consola
    }
}

request.send();