
function Hvac(){
// water cooled Evaporator electric  motor


// constants
var CP=1;
var d=997;


//usre inputs
var duration_run=parseFloat(document.getElementById("durationofrun").value);
var ql=parseFloat(document.getElementById("Ql").value);
var Tei=parseFloat(document.getElementById("Tei").value);
var Teo=parseFloat(document.getElementById("Teo").value);
var Wm=parseFloat(document.getElementById("Wm").value);
var nt=parseFloat(document.getElementById("nt").value);//drop down



// calc
var Wc =  Wm*0.92*nt



var Qe=(ql*d*CP*(Tei-Teo))/3024

document.getElementById("Qe").value=Qe;

var R=Qe/3.51*3600;
// document.getElementById("R").value=R;
document.getElementById("Wc").value=Wc;

var COP= (Qe*3024)/ Wc;         
document.getElementById("COP").value=COP;

var EER = Qe/Wc;
document.getElementById("EER").value=EER;
  
var SPC = Wc/Qe;
document.getElementById("SPC").value=SPC;


}