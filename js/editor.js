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

// Inicialización inicial
updateAnalysis();
adjustEditorHeight(editor);
