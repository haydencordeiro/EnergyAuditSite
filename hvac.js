



// inputs
var Q=1;
var typeofEngine=0;


// calculations

var Wc=1;
var COP
if(typeofEngine==0){
    var Wm=1;
    var hm=1;
    var ht=1;
     Wc = Wm * hm * ht
}
else if(typeofEngine==1){
    Wc = We * ht
}


var fluid=true;//water
if(fluid){

    var To=1;
    var Ti=1;
    COP= Q*997 * 1*(To- Ti)/3600*Wc                                                   
}
else{

    var hi=1;
    var ho=1;
    COP= Q*1.225 * (hi- ho)/3600*Wc                                                          
}


var  EER = COP * 3.418;
var SPC = 3.51 / COP;
console.log(EER);
console.log(SPC);
