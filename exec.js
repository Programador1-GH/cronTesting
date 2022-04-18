const child_process = require("child_process");
const cron = require("node-cron");

console.log("Para ejecución inmediata use: $ node ./exec.js now");
console.log("cron (* * * * 1-5) esperando...");
cron.schedule("* * * * 1-5", () => {
            console.log("-----------------------------");
        });