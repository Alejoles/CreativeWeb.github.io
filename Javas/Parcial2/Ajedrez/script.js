function makeRows(rows, cols) {
    filas = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('');
    filas.slice(0, rows)
    columnas = $.map($(Array(cols)), function (val, i) { return i + 1; })

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    w = 0;
    r = 0;
    l = 0;
    for (c = 0; c < (rows * cols); c++) {

        // console.log(w)

        let casilla = "casilla-blanca";

        if (w % 2 == 0) {
            casilla = "casilla-negra"
        }

        w++;

        let cell = document.createElement("div");
        // cell.innerText = filas[r] + columnas[l];

        cell.setAttribute("id", filas[r] + columnas[l])
        cell.setAttribute("ondrop", "drop(event)")
        cell.setAttribute("ondragenter", "dragEnter(event)")
        cell.setAttribute("ondragleave", "dragLeave(event)")
        cell.setAttribute("ondragover", "allowDrop(event)")
        container.appendChild(cell).className = casilla;

        if (l == 0) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_black.svg')");
            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_black.svg')");
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_black.svg')");
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_black.svg')");
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_black.svg')");
            }
            cell.appendChild(ficha);
        }

        if (l == 1) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_black.svg')");
            cell.appendChild(ficha);
        }

        if (l == 6) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_white.svg')");
            cell.appendChild(ficha);
        }

        if (l == 7) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_white.svg')");
            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_white.svg')");
                // ficha.setAttribute("onClick", "getId(event)");

                ficha.setAttribute("ondragstart", "drag(event)");
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_white.svg')");
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_white.svg')");
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_white.svg')");
            }
            cell.appendChild(ficha);
        }


        r++;
        if ((c + 1) % 8 == 0 & w != 0) {
            r = 0
            l++
            if (((c + 1) / 8) % 2 == 0) { w = 0 } else { w = 1 }
        }


    };
};

makeRows(8, 8);


let piece = {
    active : {value: 1, writable: true},     // Booleano, 0 si la ficha ha sido eliminada, 1 en otro caso.

    enabled : 0,    // booleano, 1 si la ficha tiene el mismo color del jugador actual, 0 en otro caso.

    enable: function(colorac, turncolor){
        if(colorac == turncolor){
            this.enabled = 1;
        }
        else{
            this.enabled = 0;
        }
    },

    box : "",        //Corresponde a la casilla en la que se encuentra ubicada actualmente la ficha,
                    //si ha sido eliminada su valor es NaN.
        casilla : function(cassillita){
            this.box = cassillita;
        },


    color : "" ,    //String con la información del color de la ficha, blanca o negra.
                    //Este valor debe ser no mutable a lo largo de una misma partida

    wcolor : function(valuecolor){
        this.color = valuecolor;
    },
    getcolor: function(){
        return this.color;
    },

    name : "",      //String con el nombre de la ficha pawn (peón), rook (torre), knight (caballo),
                    //bishop (alfil), king (rey) y queen (reina).

    wname: function(nombre){
        this.name = nombre;
    },
    getname: function(){
        return this.name;
    },
    
    //Movement retorna un vector con las posibilidades de moverse

    movement : function(coordenada){  /*Método que contiene la lógica del movimiento partiendo desde una
                            determinada coordenada (parámetro). Es una función programada para cada ficha.*/
            var vector1 = ["A","B","C","D","E","F","G","H"];
            var vector2 = [1,2,3,4,5,6,7,8];

            if(this.name == "pawn"){ // PEÓN
            if(this.color == "white"){
                if(coordenada.charAt(0).charCodeAt(0) > 65 && coordenada.charAt(0).charCodeAt(0) < 72){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y--,X++ OR Y--,X--
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))-1;
                        var cory2 = Number(coordenada.charAt(1))-2;

                        var mov = [corx + cory,corx + cory2];
                        //Chequear si hay obstaculos
                        return mov;
                    }
                }
                else if(coordenada.charAt(0).charCodeAt(0) == 65){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y--,X++
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))-1;
                        var cory2 = Number(coordenada.charAt(1))-2;

                        var mov = [corx + cory,corx + cory2];
                        //Chequear si hay obstaculos
                        return mov;
                    }
                } 
                else if (coordenada.charAt(0).charCodeAt(0) == 72){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y--,X--
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))-1;
                        var cory2 = Number(coordenada.charAt(1))-2;
                        var mov = [corx + cory,corx + cory2];
                        //Chequear si hay obstaculos
                        return mov;
                    }
                }
            }
            else if(this.color == "black"){
                if(coordenada.charAt(0).charCodeAt(0) > 65 && coordenada.charAt(0).charCodeAt(0) < 72){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y++,X++ OR Y++,X--
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))+1;
                        var cory2 = Number(coordenada.charAt(1))+2;
                        var mov = [corx + cory,corx + cory2];
                        //Chequear si hay obstaculos
                        return mov;
                    }
                }
                else if(coordenada.charAt(0).charCodeAt(0) == 65){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y++,X++
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))+1;
                        var cory2 = Number(coordenada.charAt(1))+2;
                        var mov = [corx + cory,corx + cory+2];
                        //Chequear si hay obstaculos
                        return mov;
                    }
                } 
                else if (coordenada.charAt(0).charCodeAt(0) == 72){
                    if(coordenada.charAt(1) > 1 && coordenada.charAt(1) < 8){
                        // PEÓN ATACA EN DIAGONAL Y++,X--
                        var cor = coordenada.charAt(0).charCodeAt(0);
                        var corx = String.fromCharCode(cor);
                        var cory = Number(coordenada.charAt(1))+1;
                        var cory2 = Number(coordenada.charAt(1))+2;
                        var mov = [corx + cory,corx + cory2];
                        //Chequear si hay obstaculos
                        return mov;
                        }
                    }
            }
        }
        else if(this.name == "rook"){ // TORRE
            // pensar
            var uno = [];
            var dos = [];
            var tres = [];
            var cuatro = [];
            var mov = [];
            for(var i = 1; i<10;i++){
                uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))];
                dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))-i];
                tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))];
                cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))+i];
                if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                    mov.push(uno[0] + uno[1])
                }
                if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                    mov.push(dos[0] + dos[1])
                }
                if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                    mov.push(tres[0] + tres[1])
                }
                if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                    mov.push(cuatro[0] + cuatro[1])
                }
            }   
            return mov;
        }
        else if(this.name == "knight"){ // Caballo
            // estar pendiente de los bordes, casos para cada paso
            var meter1 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-1);
            var meter2 = Number(coordenada.charAt(1)) - 2;
            var meter3 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+1);
            var movy1 = [meter1, meter2, meter3];
        
            meter1 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+1);
            meter2 = Number(coordenada.charAt(1)) + 2;
            meter3 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-1);
            var movy2 = [meter1, meter2, meter3];

            meter1 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+2);
            meter2 = Number(coordenada.charAt(1)) - 1;
            meter3 = Number(coordenada.charAt(1)) + 1;
            var movx1 = [meter1, meter2, meter3];

            meter1 = String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-2);
            meter2 = Number(coordenada.charAt(1)) - 1;
            meter3 = Number(coordenada.charAt(1)) + 1;
            var movx2 = [meter1,meter2,meter3];

            var mov = [];
            var pal = "";
            if(vector1.includes(movy1[0]) && vector2.includes(movy1[1])){
                pal = movy1[0] + movy1[1];
                mov.push(pal);
            }
            if(vector1.includes(movy1[2]) && vector2.includes(movy1[1])){
                pal = movy1[2] + movy1[1];
                mov.push(pal);
            }
            if(vector1.includes(movy2[0]) && vector2.includes(movy2[1])){
                pal = movy2[0] + movy2[1];
                mov.push(pal);
            }
            if(vector1.includes(movy2[2]) && vector2.includes(movy2[1])){
                pal = movy2[2] + movy2[1];
                mov.push(pal);
            }
            if(vector1.includes(movx1[0]) && vector2.includes(movx1[1])){
                pal = movx1[0] + movx1[1];
                mov.push(pal);
            }
            if(vector1.includes(movx1[0]) && vector2.includes(movx1[2])){
                pal = movx1[0] + movx1[2];
                mov.push(pal);
            }
            if(vector1.includes(movx2[0]) && vector2.includes(movx2[1])){
                pal = movx2[0] + movx2[1];
                mov.push(pal);
            }
            if(vector1.includes(movx2[0]) && vector2.includes(movx2[2])){
                pal = movx2[0] + movx2[2];
                mov.push(pal);
            }
            return mov;
        }
        else if(this.name == "bishop"){ // ALFIL
            var uno = [];
            var dos = [];
            var tres = [];
            var cuatro = [];
            var mov = [];
            for(var i = 1; i<10;i++){
                uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))-i];
                dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))-i];
                tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))+i];
                cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))+i];
                if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                    mov.push(uno[0] + uno[1])
                }
                if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                    mov.push(dos[0] + dos[1])
                }
                if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                    mov.push(tres[0] + tres[1])
                }
                if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                    mov.push(cuatro[0] + cuatro[1])
                }
            }   
            return mov;
        }
        else if(this.name == "king"){ // REY
            var uno = [];
            var dos = [];
            var tres = [];
            var cuatro = [];
            var mov = [];
            uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-1), Number(coordenada.charAt(1))-1];
            dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+1), Number(coordenada.charAt(1))-1];
            tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-1), Number(coordenada.charAt(1))+1];
            cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+1), Number(coordenada.charAt(1))+1];
            if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                mov.push(uno[0] + uno[1])
            }
            if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                mov.push(dos[0] + dos[1])
            }
            if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                mov.push(tres[0] + tres[1])
            }
            if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                mov.push(cuatro[0] + cuatro[1])
            }
            uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-1), Number(coordenada.charAt(1))];
            dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))-1];
            tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+1), Number(coordenada.charAt(1))];
            cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))+1];
            if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                mov.push(uno[0] + uno[1])
            }
            if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                mov.push(dos[0] + dos[1])
            }
            if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                mov.push(tres[0] + tres[1])
            }
            if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                mov.push(cuatro[0] + cuatro[1])
            } 
            return mov;
        }
        else if(this.name == "queen"){ // REINA
            var uno = [];
            var dos = [];
            var tres = [];
            var cuatro = [];
            var mov = [];
            for(var i = 1; i<10;i++){
                uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))-i];
                dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))-i];
                tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))+i];
                cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))+i];
                if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                    mov.push(uno[0] + uno[1])
                }
                if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                    mov.push(dos[0] + dos[1])
                }
                if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                    mov.push(tres[0] + tres[1])
                }
                if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                    mov.push(cuatro[0] + cuatro[1])
                }
                uno = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)-i), Number(coordenada.charAt(1))];
                dos = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))-i];
                tres = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)+i), Number(coordenada.charAt(1))];
                cuatro = [String.fromCharCode(coordenada.charAt(0).charCodeAt(0)), Number(coordenada.charAt(1))+i];
                if(vector1.includes(uno[0]) && vector2.includes(uno[1])){
                    mov.push(uno[0] + uno[1])
                }
                if(vector1.includes(dos[0]) && vector2.includes(dos[1])){
                    mov.push(dos[0] + dos[1])
                }
                if(vector1.includes(tres[0]) && vector2.includes(tres[1])){
                    mov.push(tres[0] + tres[1])
                }
                if(vector1.includes(cuatro[0]) && vector2.includes(cuatro[1])){
                    mov.push(cuatro[0] + cuatro[1])
                }
            }   
            return mov;
        }


    },



    possibilities : [],  //Array calculado con base en el método de movimiento. Contiene las posibles casillas 
                        //a las que puede moverse la ficha. Si una casilla ya está ocupada por una ficha 
                        //del mismo color, dicha casilla no debe ser parte del array.

    calcposs: function(vecmov){
        // Si en el array de movimientos hay una ficha del mismo color, se omite el movimiento en ese espacio
        this.possibilities = [];
    },
    

    move : function(casillanueva){  //Este método debe actualizar los datos de la partida, tiene como parámetro la
                        //casilla nueva. Cuando una ficha se mueve a la casilla nueva, la 
                        //casilla actual pasa a ser NaN y la ficha.box pasa a tener la casilla actual. 
                        //Si en la casilla nueva hay una ficha de otro color, dicha ficha debe ser eliminada.
        // 
    }        
    
};



let box = {
    coordinate : {
        fila : ["A","B","C","D","E","F","G","H"],
        columa : [1,2,3,4,5,6,7,8]
    },

    piece : 0,  //Objeto de prototipo ficha, que indica la ficha que se encuentra en la casilla
                //en ese momento. En caso de que en la casilla no haya una ficha el valor sería NaN.
    

    delete : function(){//Método para eliminar una ficha de la casilla,
                        //cambia el valor de la propiedad active de la ficha a ”false”.

        piece.active.value = 0;
    }, 

    darcoor : function(cass){
        var pal = "";
        var pal = cass[0] + cass[1];
        return pal;
    }
};



var chessboard = {
    turno : "",
    
    settear : function(count){
        this.turno = count;
    },

    turn : function(){
        var color;
        if(this.turno%2 == 0){
            color = "white";
        }
        else{
            color = "black"
        }
        return color;
    },

    boxes : 0,

    createbox : function(){
        // se crea el array de 8x8 
    }

};







let casillaStart = "";
let nameStart = "";
let colorStart = "";

function dragStart(event) {
    console.log(this.id);
    event.dataTransfer.setData("Text", event.target.id);
}

function dragEnter(event) {
    console.log("Casilla: ", this.casillaStart);
    console.log("Pieza: ", this.nameStart);
    console.log("Color: ", this.colorStart);

    //---------------------------
    piece.casilla(event.target.id);
    //---------------------------

    //Chequear si debe estar enabled
        pieceProp = a.replace('url("img/', '').replace('\.svg")', "").split("_");
        color = pieceProp[1];
        piece.enable(color, chessboard.turn());
    //-----------------------------


    
    //MOVEMENT---------------------------
        piece.wname(name);
        piece.wcolor(color);
        var pos = event.target.id.split('');
        console.log(piece.movement(box.darcoor(pos)));
    //-----------------------------------

    coord = this.casillaStart.split('');


    let vector = ["H6", "F6"]; // Aqui van sus métodos que generan el vector
    console.log(vector);
    if (vector.includes(event.target.id)) {
        event.target.style.border = "3px dotted rgb(0, 195, 255)";
    } else {
        event.target.ondrop = "return false";
    }

}

function dragLeave(event) {
    event.target.style.border = "";
}

function allowDrop(event) {
    event.preventDefault();
}

var count = 0;
console.log(chessboard.turn());

function drop(event) {

    

    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var sale = document.getElementById(data);
    a = sale.style.backgroundImage
    pieceProp = a.replace('url("img/', '').replace('\.svg")', "").split("_");
    color = pieceProp[1];
    name = pieceProp[0];
    event.target.appendChild(sale);
    sale.id = event.target.id + "img"
    this.mover() // Aqui pones tu función de actualizar
    console.log("Casilla: ", event.target.id)
    console.log("Color:", color)
    console.log("Nombre:", name)

    count++;
    chessboard.settear(count);
    console.log(chessboard.turn());

    /*var cass = event.target.id.split('');
    console.log(box.darcoor(cass));*/


}

function drag(event){
    //event.preventDefault();
    this.casillaStart = event.target.id.replace("img", "")
    console.log("Casilla Inicio: ", event.target.id)
    piece1 = document.getElementById(event.target.id)
    a = piece1.style.backgroundImage
    pieceProp = a.replace('url("img/', '').replace('\.svg")', "").split("_");
    this.colorStart = pieceProp[1];
    this.nameStart = pieceProp[0];
    event.dataTransfer.setData("Text", event.target.id);
}

function getId(event){
    console.log("Aver a ver ", event.target.id)
}

function mover(){
    console.log("Actualizado")
}
