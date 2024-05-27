// server.js
const express = require('express');
const { exec } = require('child_process');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors()); // Permitir solicitudes de origen cruzado

// Middleware para parsear JSON
app.use(express.json());

function logAndSendError(res, message, error) {
    console.error(message);
    if (error) console.error(error);
    res.status(500).send(message);
}

// Ruta para compilar el código
app.post('/compile', (req, res) => {
    if (!req.body || !req.body.code) {
        console.error('No code provided');
        return res.status(400).send('No code provided');
    }

    const codePath = path.resolve('../server/temp', 'input.js');
    const outputPath = path.resolve('../server/bin', 'output.bin'); // Especificar nombre completo del archivo de salida

    // Asegúrate de que las carpetas existan
    if (!fs.existsSync(path.dirname(codePath))) {
        fs.mkdirSync(path.dirname(codePath), { recursive: true });
    }
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    // Guarda el código en un archivo
    try {
        fs.writeFileSync(codePath, req.body.code);
    } catch (error) {
        return logAndSendError(res, 'Error writing code to file', error);
    }

    console.log(`Compilando código en ${codePath}...`);

    // Comando para compilar a código máquina
    const command = `nectar ${codePath} --target native -o ${outputPath}`;
    console.log(`Ejecutando comando: ${command}`);

    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error en la compilación: ${stderr}`);
            return res.status(500).send(`Compilation error: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`Compilation successful, binary created at ${outputPath}`);
    });
});

// Ruta para descargar el binario
app.get('/download-binary', (req, res) => {
    const filePath = path.resolve('../server/bin', 'output.bin');
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('Binary file not found');
    }
});

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar el proxy a PHP
app.use('/php', createProxyMiddleware({ target: 'http://localhost:80', changeOrigin: true }));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
