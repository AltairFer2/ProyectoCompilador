<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/esprima@4.0.1/dist/esprima.min.js"></script>
    <link rel="stylesheet" href="../public/css/style.css">
</head>

<body>
    <div id="TableContainer">
        <button id="runButton">Run Code</button>
        <table id="tokenTable" class="tokenTable">
        </table>
        <a id="downloadLink" class="download-link" href="#" style="display:none;"
            download="intermediateCode.js">Download Intermediate Code</a>
    </div>
    <div class="editor-errors-container">
        <div id="editor"></div>
        <div id="errorSection"></div>
    </div>
    <script type="module" src="../public/js/editor.js"></script>

</body>

</html>