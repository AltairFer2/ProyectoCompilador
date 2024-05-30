
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file = fopen("/var/www/html/ProyectoCompilador/server/output.bin", "rb");
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
