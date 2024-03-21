import { tokenDescriptions } from './tokenDescriptions.js';
import { editor } from './editor.js';
import { traducirTipoToken } from './utils.js';

function aNotacionPolacaInversa(nodo) {
    if (!nodo) return '';
    switch (nodo.type) {
        case 'Literal':
            return nodo.value.toString();
        case 'BinaryExpression':
            const izquierda = aNotacionPolacaInversa(nodo.left);
            const derecha = aNotacionPolacaInversa(nodo.right);
            return `${izquierda} ${derecha} ${nodo.operator}`;
        // Agrega más casos según sea necesario.
        default:
            return '';
    }
}

function encontrarPrimerExpresionBinaria(nodo) {
    if (nodo.type === 'BinaryExpression') {
        return nodo;
    }

    for (let prop in nodo) {
        if (nodo.hasOwnProperty(prop) && typeof nodo[prop] === 'object') {
            let resultado = encontrarPrimerExpresionBinaria(nodo[prop]);
            if (resultado) return resultado;
        }
    }

    return null;
}


export function updateAnalysis() {
    const code = editor.getValue();
    document.getElementById("errorSection").innerHTML = '';
    try {
        esprima.parseScript(code);
        const tokens = esprima.tokenize(code, { range: true });

        const ast = esprima.parseScript(code);

        const expresionBinaria = encontrarPrimerExpresionBinaria(ast);

        if (expresionBinaria) {
            const expresionNPI = aNotacionPolacaInversa(expresionBinaria);
            document.getElementById("errorSection").innerHTML = `<span class="success-message">Expresión en Notación Polaca Inversa: ${expresionNPI}</span>`;
        } else if (document.getElementById("errorSection").innerHTML === '') {
            document.getElementById("errorSection").innerHTML = '<span class="success-message">Tu código compila correctamente</span>';
        }

        let tokenTable = document.getElementById("tokenTable");
        tokenTable.innerHTML = "";

        let headerRow = tokenTable.insertRow(-1);
        let headers = ["Tipo de Token", "Valor", "Descripción"];
        headers.forEach(headerText => {
            let headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let valorToken = token.value;
            let tipoTokenEspañol = traducirTipoToken(token.type);
            let description = tokenDescriptions[token.type] || 'Descripción no disponible';

            if (token.type === 'Punctuator') {
                if (['(', '{', '['].includes(token.value)) {
                    for (let j = i + 1; j < tokens.length; j++) {
                        if ((token.value === '(' && tokens[j].value === ')') ||
                            (token.value === '{' && tokens[j].value === '}') ||
                            (token.value === '[' && tokens[j].value === ']')) {
                            valorToken += tokens[j].value;
                            i = j;
                            break;
                        }
                    }
                }
            }

            let row = tokenTable.insertRow(-1);
            let cellTipo = row.insertCell(0);
            cellTipo.textContent = tipoTokenEspañol;

            let cellValor = row.insertCell(1);
            cellValor.textContent = valorToken;

            let cellDescripcion = row.insertCell(2);
            cellDescripcion.textContent = description;
        }




    } catch (error) {
        let errorMessage;
        // Revisa si el mensaje de error se ajusta a patrones conocidos de errores léxicos
        if (error.message.includes('Invalid or unexpected token')) {
            errorMessage = `<span class="error-message">Error léxico: token inválido o inesperado. ${error.message}</span>`;
        } else if (error.message.includes('Unexpected character')) {
            errorMessage = `<span class="error-message">Error léxico: carácter inesperado. ${error.message}</span>`;
            // Añade más condiciones según sea necesario
        } else {
            // Asume que cualquier otro tipo de error es sintáctico
            errorMessage = `<span class="error-message">Error sintáctico: ${error.message}</span>`;
        }
        document.getElementById("errorSection").innerHTML = errorMessage;
    }
}

export function adjustEditorHeight(editorInstance) {
    const newHeight = Math.max(editorInstance.getScrollInfo().height, 570) + 'px';
    editorInstance.getWrapperElement().style.height = newHeight;
    editorInstance.refresh();
}