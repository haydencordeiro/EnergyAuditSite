
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
var Wc =  Wm * 0.98 *nt


console.log(duration_run,d,Tei,Teo)
var Qe=duration_run*d*(Tei-Teo)
document.getElementById("Qe").value=Qe;

var R=Qe/3.51*3600;
document.getElementById("R").value=R;
document.getElementById("Wc").value=Wc;

var COP= (Qe*d* CP*(Teo- Tei))/(3600*Wc)  
document.getElementById("COP").value=COP;

var EER = COP * 3.418 ;
document.getElementById("EER").value=EER;
  
var SPC = 3.51 / COP

}