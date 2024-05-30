const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const binPath = path.join(__dirname, 'output.bin');
const exePath = path.join(__dirname, 'ejecutar_bin.exe');

// Escribir un archivo temporal para el código C que ejecuta el binario
const cCode = `
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file = fopen("${binPath}", "rb");
    if (!file) {
        perror("No se puede abrir el archivo .bin");
        return 1;
    }

    fseek(file, 0, SEEK_END);
    long fileSize = ftell(file);
    rewind(file);

    char *buffer = (char*)malloc(fileSize);
    if (!buffer) {
        perror("No se puede asignar memoria");
        fclose(file);
        return 1;
    }

    fread(buffer, 1, fileSize, file);
    fclose(file);

    printf("%s", buffer);

    free(buffer);
    return 0;
}
`;

const cPath = path.join(__dirname, 'ejecutar_bin.c');
fs.writeFileSync(cPath, cCode);

// Compilar el código C a un .exe usando MinGW
exec(`gcc -o ${exePath} ${cPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error en la compilación: ${stderr}`);
        return;
    }
    console.log(`Archivo .exe generado exitosamente: ${exePath}`);
});
