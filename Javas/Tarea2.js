let arr = "";

function fibo(n){
    if(n == 0) return 0;
    if(n < 2){
        return 1;
    }
    else{
        arr+= " "+ fibo(n-1) + fibo(n-2);
        return fibo(n-1) + fibo(n-2);
    }
}



function estandariza(x, media, varianza){
    if(!media) media= 0;
    if(!varianza) varianza= 1;
    return(x-media)/varianza
}

function est_media(x, media){
    function est_varianza(varianza){
        return(x-media)/varianza;
    }
    return est_varianza;
}


function multi(arr1, arr2){
    function anidad(media, varianza){
        if(media == self){
            var medx = (arr1.reduce(function(ant, next){return ant + next}, 0))/arr1.length;
            var medy = (arr2.reduce(function(ant, next){return ant + next}, 0))/arr2.length;
            var med = (medx+medy)/2;
            var X_est_var = arr1.map(function(x){return (x-med)/varianza});
            var Y_est_var = arr2.map(function(x){return (x-med)/varianza});
            var ret = X_est_var.reduce(function(anx, acx, indx){ return anx + acx * Y_est_var[indx]}, 0 );
            return ret;
        }
        else if(varianza == self){
            var varx = (arr1.reduce(function(ant,next){return ant + Math.pow(next - med,2)}))/arr1.length;
            var vary = (arr2.reduce(function(ant,next){return ant + Math.pow(next - med,2)}))/arr2.length;
            var varian = Math.pow((varx + vary)-med,2)/2; 

            var X_est_var = arr1.map(function(x){return (x-media)/varian});
            var Y_est_var = arr2.map(function(x){return (x-media)/varian});
            var ret = X_est_var.reduce(function(anx, acx, indx){ return anx + acx * Y_est_var[indx]}, 0 );
            return ret;
        }
        else if(media == self && varianza == self){
            var medx = (arr1.reduce(function(ant, next){return ant + next}, 0))/arr1.length;
            var medy = (arr2.reduce(function(ant, next){return ant + next}, 0))/arr2.length;
            var med = (medx+medy)/2;

            var varx = (arr1.reduce(function(ant,next){return ant + Math.pow(next - med,2)}))/arr1.length;
            var vary = (arr2.reduce(function(ant,next){return ant + Math.pow(next - med,2)}))/arr2.length;
            var varian = Math.pow((varx + vary)-med,2)/2; 

            var X_est_var = arr1.map(function(x){return (x-med)/varian});
            var Y_est_var = arr2.map(function(x){return (x-med)/varian});
            var ret = X_est_var.reduce(function(anx, acx, indx){ return anx + acx * Y_est_var[indx]}, 0 );
            return ret;
        }
        else{
            var X_est_var = arr1.map(function(x){return (x-media)/varianza});
            var Y_est_var = arr2.map(function(x){return (x-media)/varianza});
            var ret = X_est_var.reduce(function(anx, acx, indx){ return anx + acx * Y_est_var[indx]}, 0 );
            //Punto2
            return ret;
        }
    }
    return anidad;
}