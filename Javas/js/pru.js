/*var compra = {
    id:"123455",
    valorUnitario: 1000,
    cantidad: 10
  }

Object.defineProperty(compra, "valorCompra", {
    get: function(){
        return this.cantidad* this.valorUnitario;
    }
});*/

var ob = {
    punto:{x:1,y:1},
    radio:1,
    angulo:0
}

Object.defineProperty(ob, "rad", {
    get: function(){
        return Math.sqrt(this.punto.x**2 + this.punto.y**2);
    }
});

Object.defineProperty(ob, "ang", {
    get: function(){
        return Math.atan2(this.punto.y + this.punto.x);
    }
});

Object.defineProperty(ob, "set1", {
    set: function(radio){
        this.radio = radio;
        this.punto.x = radio*Math.cos(Math.PI/4);
        this.punto.y = radio*Math.sin(Math.PI/4);
        return this.punto;
    }
});

Object.defineProperty(ob, "set2", {
    set: function(Array =[rad,ang]){
        this.punto.x = rad*Math.cos(ang);
        this.punto.y = rad*Math.sin(ang);
        return this.punto;
    }
});

//--------------------



var obj2 = {y : {value:1, writable:true}};
obj2.y.value





var obj12 = Object.create(Object.freeze({x:1}),
    {y : {value:1, writable:true}}
);


//--------------------------------------------------------



function usuario(){
    this.nombre = "";
    this.correo = "";
}


function Pro(){
    this.membresia = 0;
}

//---------------------- ejercicio 0 -----------------------------------

function herencia(p) {
    if (p == null) throw TypeError(); // ________________________
    var t = typeof p; // __________________________________
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {}; // ________________________________________
    f.prototype = p; // __________________________________________
    return new f(); // ___________________________________________
}


Casa = { direccion: "Cll 116 # 34-50", tipo: "Comercial" , color_fachada: "Rojo", clase: "Casa"}
Casa1 = herencia(Casa)
Casa1.tipo = "Vivienda"
Casa1.direccion = "Cll 26 # 4-80"
Empresa = { nombre : "Patuco" , direccion: "Cll 25 # 4-80", gerente: "Lucas Patuco Rey"}


for(let i in Casa){
    console.log(i);
}

//----------------------- ejercicio 1 --------------------------------------

function expandir(ob1, ob2){
    for(let i in ob1){
        if(!ob2.hasOwnProperty(i)){
            ob2[i] = ob1[i];
        }
    }
    return ob2;
}

expandir(Casa1, Empresa);

//----------------------- ejercicio 2 --------------------------------------

function creates(ob1,ob2){
    let ob3 = new Object;
    for(let i in ob1){
        if(ob2.hasOwnProperty(i)){
            ob3[i] = ob1[i];
        }
    }
    return ob3;
}

creates(Casa1, Empresa);

//----------------------- ejercicio 3 --------------------------------------
