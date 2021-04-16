




function mainCalculation(){

    // Required inputs
    var RatedCap=document.getElementById("RatedCap").value;
    var DailyUsage=document.getElementById("DailyUsage").value;
    var DaysPerMonth=document.getElementById("DaysPerMonth").value;
    var NoOfLuminaries=document.getElementById("NoOfLuminaries").value;
    var Tarrif=document.getElementById("tariff").value;
    var RoomLen=document.getElementById("roomLength").value;
    var RoomWidth=document.getElementById("roomWidth").value;
    var RoomHeight=document.getElementById("roomHeight").value;
    var Lumens=document.getElementById("Lumens").value;
    var NTable=document.getElementById("buildingIdentification").value;
    
    
    // Calculations
    
    function GetUF(RI){
        var all=[0.6,0.8,1,1.25,1.5,2,2.5,3,4,5]
        var i=0;
        while(all[i]<RI){
            i+=1;
        }
        var tempnew=[0.37,0.46,0.53,0.59,0.65,0.72,0.78,0.81,0.86,0.9]
        var low=all[i-1];
        var high=all[i];
        var tempRi=0;
        if((RI-low>high-RI )||(high==RI)){
            tempRi=i;
        }
        else{
            tempRi=i-1;
        }
        return tempnew[i];
    
    }
    
 
        
    
    // constant for every rooom
    // pre calc values
    
    const equipDropRef=document.getElementById("equipmentNameSingle");
    
    var LLF=0.8;
    var RI=Math.round((RoomLen*RoomWidth)/(RoomHeight*(RoomLen+RoomWidth)));
    var UF=GetUF(RI);
    var N=(RoomLen*RoomWidth*NTable)/(Lumens*UF*LLF);
    var Eav=(NoOfLuminaries*Lumens*UF*LLF)/(RoomLen*RoomWidth);
    
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
        output["MEC"] = MEC;
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

    function RecommnedationLight(data,monBill){
        var tempdata={}
        
        Object.assign(tempdata, data);

        for(var i=0;i<specData.length;i++){
            if(i!=equipDropRef.value){

            
                tempdata["RatedCap"]=specData[i]["power"]
                tempdata["Lumens"]=specData[i]["lumen"]
                
                tempcalc=CalculateValues(tempdata);
                // console.log(tempcalc)
                if(tempcalc["Bill"]<monBill){

                    console.log(tempcalc);
                }
            
            }

        }
    }

    
    calc=CalculateValues(data);
    RecommnedationLight(data,calc["Bill"]);
    //console.log("Bill",calc["Bill"]);
    document.getElementById('dailyBill').value = (calc["Bill"]/DaysPerMonth).toFixed(2);
    document.getElementById('monthlyBill').value = calc["Bill"].toFixed(2);
    document.getElementById('yearlyBill').value = (calc["Bill"]*12).toFixed(2);
    //console.log("MEC",calc["MEC"]);
    document.getElementById('monthlyConsumption').value = calc["MEC"].toFixed(2);
    //console.log("RI",RI);
    // document.getElementById('roomIndex').value = RI;
    //console.log("N",N);
    // document.getElementById('fittingNumber').value = N;
    //console.log("Eav",Eav);
    // document.getElementById('eav').value = Eav;
    //console.log("LE",calc["LE"]);
    document.getElementById('luminousEfficiency').value = calc["LE"].toFixed(2);
    //console.log("W/m2",calc["W/m2"]);
    document.getElementById('wpm2').value = calc["W/m2"].toFixed(2);
    //console.log("EPI",calc["EPI"]);
    document.getElementById('epi').value = calc["EPI"].toFixed(2);
}
    
  
