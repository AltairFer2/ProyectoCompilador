const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const intermediateCodePath = path.join(__dirname, 'temp', 'intermediateCode.js');
const cPath = path.join(__dirname, 'prueba.c');
const exePath = path.join(__dirname, 'bin', 'ejecutar_bin.exe');

// Leer el código intermedio de JavaScript
fs.readFile(intermediateCodePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error leyendo el archivo de código intermedio: ${err}`);
        return;
    }

    // Convertir el código JavaScript en código C
    const cCode = `
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    // Imprimir el contenido del archivo .js
    printf("${data.replace(/"/g, '\\"').replace(/\n/g, '\\n')}\\n");
    
    // Delay de un minuto (60 segundos)
    sleep(60);
    
    return 0;
}
`;

    // Escribir el código C a un archivo
    fs.writeFile(cPath, cCode, (err) => {
        if (err) {
            console.error(`Error escribiendo el archivo C: ${err}`);
            return;
        }

        // Compilar el código C a un .exe usando MinGW
        exec(`gcc -o ${exePath} ${cPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error en la compilación: ${stderr}`);
                return;
            }
            console.log(`Archivo .exe generado exitosamente: ${exePath}`);
        });
    });
});
