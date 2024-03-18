<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/esprima@4.0.1/dist/esprima.min.js"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="TableContainer">
        <table id="tokenTable" class="tokenTable">
        </table>
    </div>
    <div class="editor-errors-container">
        <div id="editor"></div>
        <div id="errorSection"></div>
    </div>
    <script type="module" src="js/editor.js"></script>

</body>

</html>