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
});

// Initial update
updateAnalysis();
adjustEditorHeight(editor);
