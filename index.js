

const equipDropRef=document.getElementById("equipmentNameSingle");
function createEquipmentDropDown(){
    tempString=`<option value=""></option>`
    for(var i=0;i<specData.length;i++){
        tempString+=`<option value="${i}">${specData[i]["name"] + " " + specData[i]["power"]+"w"} </option>`;
    }
    equipDropRef.innerHTML=tempString;
}

createEquipmentDropDown();


function onChangeEquipmentDropDown(){
    const lumnens=document.getElementById("Lumens");
    const ratedCap=document.getElementById("RatedCap");
    lumnens.value=specData[equipDropRef.value]["lumen"];
    ratedCap.value=specData[equipDropRef.value]["power"];

    
    
}
