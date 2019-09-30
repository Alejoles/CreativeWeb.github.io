


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
        X_est = arr1.map(function(x){(x-media)/varianza})
        Y_est = arr2.map(function(x){(x-media)/varianza})
        /*an, ac, ind
        X_est.reduce(function(an, ac, ind){an + ac * Y_est[ind]}, 0 )*/
        //let medx = est_media(arr1, media)(varianza);
        //let medy = est_media(arr2, media)(varianza);
        //Punto2
        return medx*medy;
    }
    return anidad;
}