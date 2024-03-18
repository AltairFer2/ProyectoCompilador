import { tokenDescriptions } from './tokenDescriptions.js';
import { editor } from './editor.js';
import { traducirTipoToken } from './utils.js';

export function updateAnalysis() {
    const code = editor.getValue();
    document.getElementById("errorSection").innerHTML = '';
    try {
        esprima.parseScript(code);
        const tokens = esprima.tokenize(code, { range: true });

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

        document.getElementById("errorSection").innerHTML = '<span class="success-message">Tu código compila correctamente</span>';
    } catch (error) {
        document.getElementById("errorSection").innerHTML = '<span class="error-message">' + error.message + '</span>';
    }
}

export function adjustEditorHeight(editorInstance) {
    const newHeight = Math.max(editorInstance.getScrollInfo().height, 570) + 'px';
    editorInstance.getWrapperElement().style.height = newHeight;
    editorInstance.refresh();
}
