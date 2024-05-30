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
app.use(express.text());

function logAndSendError(res, message, error) {
    console.error(message);
    if (error) console.error(error);
    res.status(500).send(message);
}

app.post('/generate', (req, res) => {
    const code = req.body; // Asume que el código a compilar se envía como texto plano
    const codePath = path.join(__dirname, 'temp', 'input.c');
    const intermediateCodePath = path.join(__dirname, 'temp', 'intermediateCode.js');

    // Asegúrate de que las carpetas existan
    if (!fs.existsSync(path.dirname(codePath))) {
        fs.mkdirSync(path.dirname(codePath), { recursive: true });
    }

    // Guarda el código en un archivo
    try {
        fs.writeFileSync(codePath, code);
        // Simulación de conversión a código intermedio
        const intermediateCode = `Intermedio:\n${code}`;
        fs.writeFileSync(intermediateCodePath, intermediateCode);
    } catch (error) {
        return logAndSendError(res, 'Error writing code to file', error);
    }

    res.send('Archivo generado exitosamente en ' + intermediateCodePath);
});

// Ruta para descargar el archivo intermedio
app.get('/download-intermediate', (req, res) => {
    const filePath = path.join(__dirname, 'temp', 'intermediateCode.js');
    res.download(filePath);
});

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar el proxy a PHP
app.use('/php', createProxyMiddleware({ target: 'http://localhost:80', changeOrigin: true }));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
