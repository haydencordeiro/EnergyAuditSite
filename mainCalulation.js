




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
    
    function CalculateValues({RatedCap,
        DailyUsage,
        DaysPerMonth,
        NoOfLuminaries,
        Tarrif,
        RoomLen,
        RoomWidth,
        Lumens,
        calcN,
        specDataIdx,
    }){
        specDataIdx=parseInt(specDataIdx);
        var output={}
        if(calcN){

            var N=(RoomLen*RoomWidth*NTable)/(Lumens*UF*LLF);
        }
        else{
            N=NoOfLuminaries
        }
        var MEC = (RatedCap*DailyUsage*DaysPerMonth*N)/1000;
        var Eav=(N*Lumens*UF*LLF)/(RoomLen*RoomWidth);
        
        output["MEC"] = MEC;
        output["Eav"] = Eav;
        output["N"] = N;
        output["Bill"]=MEC*Tarrif;
        output["LE"]=Lumens/RatedCap;
        output["W/m2"]=(N*RatedCap)/(RoomLen*RoomWidth);
        output["EPI"]=(MEC*12)/(RoomWidth*RoomLen);
        output["nx"]=Math.round(Math.sqrt((RoomLen/RoomWidth)*N+((RoomLen-RoomWidth)/(Math.pow(RoomLen,2)*N))))
        output["ny"]=Math.round(N/output["nx"]);
        output["investment"]=parseInt(specData[specDataIdx]["Cost per piece (Rs)"])*N;

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
        "calcN":false,
        "specDataIdx":1,
    
    }

    function RecommnedationLight(data,monBill,currEav){
        var tempdata={}
        const recTable=document.getElementById("rec-table-body")
        Object.assign(tempdata, data);
        var totalString="";
        for(var i=0;i<specData.length;i++){
            if(i!=equipDropRef.value){

            
                tempdata["RatedCap"]=specData[i]["power"]
                tempdata["Lumens"]=specData[i]["lumen"]
                tempdata["calcN"]=true
                tempdata["specDataIdx"]=i
                
                tempcalc=CalculateValues(tempdata);
                // console.log(tempcalc)
                var total_inv=(tempcalc["investment"]);
                var net_saving=monBill-tempcalc["Bill"];
                var roi=Math.round(total_inv/net_saving);

                if(tempcalc["Bill"]<monBill && NTable<=tempdata["Eav"]<=currEav){

                    // console.log(tempcalc["nx"],tempcalc["ny"]);
                    // var tempString=specData[i]["name"]+" "+specData[i]["power"]+"w"+" "+tempcalc["N"].toFixed(2)+" "+tempcalc["Eav"].toFixed(2)
                    // totalString+="<br>"+tempString;
                    var tempString=`
                    <tr>
                    
                    <td>${specData[i]["name"]}</td>
                    <td>${specData[i]["power"]}</td>
                    <td>${specData[i]["lumen"]}</td>
                    <td>${specData[i]["System efficacy"]}</td>
                    <td>${specData[i]["Color Temperature"]}</td>
                    <td>${specData[i]["CRI"]}</td>
                    <td>${specData[i]["Voltage (V)"]}</td>
                    <td>${specData[i]["Life"]}</td>
                    <td>${specData[i]["Application"]}</td>
                    <td>${roi}</td>
                    
                    </tr>`
                    totalString+=tempString
                }
            
            }

        }
        if(totalString.length<2){

             totalString="<p style='color:red'> <br>Note: <br>The appliance has the energy potential suitable for the defined Area<br> </p>";
        }


        recTable.innerHTML=totalString;
    }

    
    calc=CalculateValues(data);
    RecommnedationLight(data,calc["Bill"],calc["Eav"]);
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





    document.getElementById("nooflights").value=calc["N"];
    document.getElementById("Eav").value=calc["Eav"].toFixed(2);
       document.getElementById("rows").value=calc["nx"];
      document.getElementById("cols").value=calc["ny"];
}
    
  
