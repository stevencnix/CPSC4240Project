
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');
var fs = require('fs');

var T = 5000;
var time = setInterval(cpuTimer, T);
var cpuMath = 0;
var cpuLoadString;


function cpuTimer(){
	var os = require("os"),
    cpus = os.cpus();
    hostname = os.hostname();

    for(var i = 0, len = cpus.length; i < len; i++) {
    	console.log("CPU %s:", i);
    	var cpu = cpus[i], total = 0;
        for(type in cpu.times){
            total += cpu.times[type];
        }
            for(type in cpu.times){
                cpuMath = Math.round((100 - (100 * cpu.times[type] / total))*100)/100;
                                    
                if(type == "idle"){
                    if(i == 0){
                        cpuLoadString = "cpu" + i + ": " + cpuMath;
                    }
                    else{
                        cpuLoadString = cpuLoadString + " " + "cpu" + i + ": " + cpuMath;
					}                       
				}                         
                console.log("\t", type, Math.round((100 * cpu.times[type] / total)*100)/100);
            }
    }
    var date = new Date().getTime();
    console.log("hostname: " + hostname + " " + cpuLoadString + " " + "time: " + date);
	client.publish('groupproject', "hostname: " + hostname + " " + cpuLoadString + " " + "time: " + date);
	/*
	
    cpuLoadString = date + cpuLoadString;
    console.log("\n");
    console.log("cpu usage:", cpuLoadString);
    var sys = require('util')
    var exec = require('child_process').exec;
    var child;
		
    child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } 
        else {
            // You must send time (X axis) and a temperature value (Y axis) 
            var date = new Date().getTime();
            var temp = parseFloat(stdout)/1000;
			
            console.log("time:%s, CPU temperature: %s", date, temp);
        }
    });
    */
}

