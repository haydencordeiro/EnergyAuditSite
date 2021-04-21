// inputs
var fluid_density = 997;
var hs = 30;
var hd = -4;
var Q = 576;
var V = 440;
var I = 95;
var N1 = 1485;
var rated_eff = 0.92
var power = 65;
var running_time = 5;
var working_days_month = 30;
var D = 0.3;
var l = 500;
var Tariff = 9;
// constants
var f = 0.006
var v = 2.26
var Hf = 10.413
var HP = 36.911
var SP = 59.8


var v = (Q / (0.7854 * D * D))
var hf = (4 * f * l * Math.pow(v, 2)) / (2 * 9.81 * D);

var H = hd - hs - hf
var HP = (H * Q * fluid_density * 9.81) / 1000
var SP = power * rated_eff
var EFF_pump = HP / SP;

var power_factor = power / (V * I * Math.pow(3, 0.5))

var P = power * running_time
var PM = P * working_days_month
var PY = PM * 12

var Cost_M = PM * Tariff
var Cost_Y = PY * Tariff


console.log("monthly energy consumption", PM)
console.log("monthly bill", Cost_M)

console.log("yearly energy consumption", PY)
console.log("yearly bill", Cost_Y)


console.log("total head", H);
console.log("Efficiency", EFF_pump);
console.log("power factor", power_factor);
console.log("power Consum", P);
console.log("Bill", Cost_M);