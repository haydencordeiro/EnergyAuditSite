

// Required inputs
var RatedCap=20;
var DailyUsage=19;
var DaysPerMonth=29;
var NoOfLuminaries=80;
var Tarrif=9;
var RoomLen=20;
var RoomWidth=15;
var RoomHeight=4;
var Lumens=2100;



// Calculations

// constant for every rooom
// pre calc values
var UF=0.72;
var NTable=300;

var LLF=0.8;
var N=(RoomLen*RoomWidth*NTable)/(Lumens*UF*LLF);
var Eav=(NoOfLuminaries*Lumens*UF*LLF)/(RoomLen*RoomWidth);
var RI=Math.round((RoomLen*RoomWidth)/(RoomHeight*(RoomLen+RoomWidth)));

function CalculateValues({RatedCap,
    DailyUsage,
     DaysPerMonth,
     NoOfLuminaries,
     Tarrif,
     RoomLen,
     RoomWidth,
     Lumens,
 }){
    var output={}
    var MEC = (RatedCap*DailyUsage*DaysPerMonth*NoOfLuminaries)/1000;
    output["Bill"]=MEC*Tarrif;
    output["LE"]=Lumens/RatedCap;
    output["W/m2"]=(NoOfLuminaries*RatedCap)/(RoomLen*RoomWidth);
    output["EPI"]=(MEC*12)/(RoomWidth*RoomLen);
    return output;
}



var data={
     "RatedCap":RatedCap,
    "DailyUsage":DailyUsage,
    "DaysPerMonth":DaysPerMonth,
    "NoOfLuminaries":NoOfLuminaries,
    "Tarrif":Tarrif,
    "RoomLen":RoomLen,
    "RoomWidth":RoomWidth,
    "Lumens":Lumens, 

}
calc=CalculateValues(data);

console.log("Bill",calc["Bill"]);
console.log("RI",RI);
console.log("N",N);
console.log("Eav",Eav);
console.log("LE",calc["LE"]);
console.log("W/m2",calc["W/m2"]);
console.log("EPI",calc["EPI"]);

