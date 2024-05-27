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
    var oldLog = console.log;
    console.log = function (message) {
        document.getElementById("errorSection").innerText += message + "\n"; // Ensure it captures correctly
        oldLog.apply(console, arguments);
    };
})();

document.getElementById("runButton").addEventListener("click", function () {
    var code = editor.getValue();
    fetch('/php/proyecto/ProyectoCompilador/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById("errorSection").innerText = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("errorSection").innerText = "Error en la compilación: " + error;
        });
});



// Initial update
updateAnalysis();
adjustEditorHeight(editor);
