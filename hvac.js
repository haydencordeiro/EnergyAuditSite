

var Q=1;
var d=1;
// condensor(air cooled) evaprator is both
// how to find WC?
// Cp,d are constant?

var fluid=true;//water
if(fluid){
    var Cp=1;
    var To;
    var Ti;
    var COP= Q*d* Cp*(To- Ti)/3600*Wc                                                   
}
else{

    var hi=1;
    var ho=1;
    var COP= Q*d* (hi- ho)/3600*Wc                                                          
}


var  EER = COP * 3.418
var SPC = 3.51 / COP
