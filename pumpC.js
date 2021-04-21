

function pumpCalculation() {
    // // inputs
    // // var fluid_density = 997;
    var fluid_density = document.getElementById('fluidDensity').value;
    // // var hs = 30;
    var hs = document.getElementById('sectionHead').value;
    // // var hd = -4;
    var hd = document.getElementById('dischargeHead').value;
    // // var Q = 576;
    var Q = document.getElementById('pfrc').value;
    // // var V = 440;
    var V = document.getElementById('motorVoltage').value;
    // // var I = 95;
    var I = document.getElementById('motorCurrent').value;
    // // var N1 = 1485;
    var N1 = document.getElementById('motorRPM').value;
    // // var rated_eff = 0.92
    var rated_eff = document.getElementById('ratedEff').value;
    // // var power = 65;
    var power = document.getElementById('motorPower').value;
    // // var running_time = 5;
    var running_time = document.getElementById('runningTime').value;
    // // var working_days_month = 30;
    var working_days_month = document.getElementById('workingDays').value;
    // // var D = 0.3;
    var D = document.getElementById('pipeDiameter').value;
    // // var l = 500;
    var l = document.getElementById('pipeLength').value;
    // // var Tariff = 9;
    var Tariff = document.getElementById('pumpTariff').value;
    // constants

    var f = 0.006;
    var v = 2.26;
    var Hf = 10.413;
    var HP = 36.911;
    var SP = 59.8;

    var v = (Q / (0.7854 * D * D));
    var hf = (4 * f * l * Math.pow(v, 2)) / (2 * 9.81 * D);

    var H = hd - hs - hf;
    var HP = (H * Q * fluid_density * 9.81) / 1000;
    var SP = power * rated_eff;
    var EFF_pump = HP / SP;

    var power_factor = power / (V * I * Math.pow(3, 0.5));

    var P = power * running_time;
    var PM = P * working_days_month;
    var PY = PM * 12;

    var Cost_M = PM * Tariff;
    var Cost_Y = PY * Tariff;


    console.log("monthly energy consumption", PM);
    document.getElementById('monthlyConsumption').value = PM;
    console.log("monthly bill", Cost_M);
    document.getElementById('monthlyBill').value = Cost_M;
    console.log("yearly energy consumption", PY);
    document.getElementById('yearlyConsumption').value = PY;
    console.log("yearly bill", Cost_Y);
    document.getElementById('yearlyBill').value = Cost_Y;
    console.log("total head", H);
    
    
    console.log("Efficiency", EFF_pump);
    document.getElementById('overallEff').value =EFF_pump;
    console.log("power factor", power_factor);
    document.getElementById('powerFactor').value =power_factor;

    console.log("power Consum", P);
    console.log("Bill", Cost_M);

    var tempString = `
                    <tr>
                    
                    <td>${H}</td>
                    <td>${EFF_pump}</td>
                    <td>${power_factor}</td>
                    <td>${P}</td>
                    <td>${Cost_M}</td>
                    </tr>`;


    document.getElementById('output-table-body').innerHTML = tempString;
}