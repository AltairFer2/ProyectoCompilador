import { updateAnalysis, adjustEditorHeight } from './tokenAnalysis.js';

export const editor = CodeMirror(document.getElementById("editor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "default",
    value: "console.log('Hola, mundo!');"
});

editor.on("change", function () {
    updateAnalysis();
    adjustEditorHeight(editor);
});

// Redefine console.log to capture output
(function () {
    var originalLog = console.log;
    console.log = function (message) {
        var errorSection = document.getElementById("errorSection");
        if (!errorSection.innerText.includes(message)) {
            errorSection.innerText += message + "\n";
        }
        originalLog.apply(console, arguments);
    };
})();

document.getElementById("runButton").addEventListener("click", function () {
    var code = editor.getValue();
    document.getElementById("errorSection").innerText = ""; // Limpiar la sección de errores

    try {
        eval(code); // Ejecutar el código JavaScript
    } catch (error) {
        console.error(error); // Mostrar errores en la sección de errores
    }

    // Enviar el código al servidor para generar el archivo intermedio
    fetch('/generate', {
        method: 'POST',
        body: code,
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Mostrar el mensaje de éxito en la consola
            // Actualizar el enlace de descarga
            var downloadLink = document.getElementById("downloadLink");
            downloadLink.href = '/download-intermediate';
            downloadLink.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("errorSection").innerText = "Error en la generación del archivo: " + error;
        });
});

// Initial update
updateAnalysis();
adjustEditorHeight(editor);
