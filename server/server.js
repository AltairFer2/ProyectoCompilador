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

// Middleware para parsear JSON y texto plano
app.use(express.json());
app.use(express.text());

function logAndSendError(res, message, error) {
    console.error(message);
    if (error) console.error(error);
    res.status(500).send(message);
}

// Ruta para compilar el código
app.post('/compile', (req, res) => {
    const code = req.body; // El código se envía como texto plano
    const codePath = path.resolve('temp', 'input.js');
    const outputPath = path.resolve('bin', 'output.bin');

    // Asegúrate de que las carpetas existan
    if (!fs.existsSync(path.dirname(codePath))) {
        fs.mkdirSync(path.dirname(codePath), { recursive: true });
    }
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    // Guarda el código en un archivo
    fs.writeFileSync(codePath, code);

    // Comando para compilar a código máquina
    const command = `nectar ${codePath} --target native -o ${outputPath}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error en la compilación: ${stderr}`);
            return res.status(500).send(`Compilation error: ${stderr}`);
        }
        res.send(`Archivo binario creado en ${outputPath}`);
    });
});

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar el proxy a PHP
app.use('/php', createProxyMiddleware({ target: 'http://localhost:80', changeOrigin: true }));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
