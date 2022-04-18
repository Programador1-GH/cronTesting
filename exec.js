const child_process = require("child_process");
const cron = require("node-cron");

console.log("cron (* * * * 1-5) esperando...");
cron.schedule("* * * * 1-5", () => {
            console.log("Esta tarea se ejecuta cada minuto");
        });