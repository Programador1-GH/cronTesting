const child_process = require("child_process");
const cron = require("node-cron");

console.log("Para ejecución inmediata use: $ node ./exec.js now");
console.log("cron (* * * * 1-5) esperando...");
cron.schedule("* * * * 1-5", () => {
    console.log("-----------------------------");
    console.log("Esta tarea se ejecuta cada minuto");
    const actualizacion = child_process.execSync("git status", {
        encoding: "utf-8",
    });
    console.log("GIT PULL LOG:\n ", actualizacion);
    console.log("-----------------------------");
    });
        

/* ESTE ES EL ARCHIVO EJECUTABLE DE HIGHQ2SHEETS
 * Si estamos en modo desarrollo, se ejecuta con el comando [$ node exec]
 * Si estamos en modo producción, se ejecuta una vez con el comando [$ node exec now]
 * Para ejecutarlo con la programación de Node-Cron, hay que usar simplemente [$ node exec]
 *
 * Al ejecutarlo una vez, llama al archivo index.js ( require("./index"); )
 * Al ejecutarlo con Node-Cron, se crean dos procesos hijos:
 * - El primero descarga el código que hay en el repositorio [$ git pull]
 * - El segundo ejecuta [$ node exec now] tras actualizar el código
 *
 * ATENCIÓN: LOS CAMBIOS EN ESTE ARCHIVO exec.js NO SE REFLEJARÁN EN LA EJECUCIÓN PROGRAMADA
 * SI ANTES NO LO DETENEMOS Y VOLVEMOS A EJECUTARLO
 * 

const config = require("./config");
const child_process = require("child_process");
const cron = require("node-cron");
const { truncate } = require("fs");

if (config.typeserver == "DESARROLLO") {
    require("./index");
} else if (config.typeserver == "PRODUCCION") {
    if (process.argv[2] == "now") {
        require("./index");
    } else {
        console.log("Para ejecución inmediata use: $ node ./exec.js now");
        console.log("cron (40 8-22 * * 1-5) esperando...");
        cron.schedule("40 8-22 * * 1-5", () => {
            console.log("-----------------------------");
            const actualizacion = child_process.execSync("git pull", {
                encoding: "utf-8",
            });
            console.log("GIT PULL LOG:\n ", actualizacion);
            console.log("-----------------------------");
            child_process.exec("node exec now", (error, stdout, stderr) => {
                if (error) {
                    console.error(`ERROR EN LA EJECUCIÓN: ${error}`);
                    return;
                }
                console.log(stdout);
                console.error(`STREAM DE ERRORES: ${stderr || "No errors"}`);
                console.log("-------------------------");
            });
            console.log(
                "PROGRAMA EJECUTÁNDOSE...\n" +
                    "ESPERANDO QUE FINALICE LA EJECUCIÓN PARA MOSTRAR EL STREAM DE SALIDA DEL PROCESO..."
            );
        });
    }
} else {
    console.log ("En el archivo 'config.js', el valor de 'config.typeserver' es distinto de 'DESARROLLO' y 'PRODUCCION'");
}*/