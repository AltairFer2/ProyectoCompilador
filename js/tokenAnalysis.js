import { tokenDescriptions } from './tokenDescriptions.js';
import { editor } from './editor.js';
import { traducirTipoToken } from './utils.js';

const scopeStack = [];
const variablesDeclaradas = new Set();
const variablesUsadas = new Set();
const errores = [];

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

function entrarScope() {
    scopeStack.push(new Set());
}

function salirScope() {
    scopeStack.pop();
}

function declararVariable(nombre) {
    if (scopeStack.length > 0) {
        scopeStack[scopeStack.length - 1].add(nombre);
    }
    variablesDeclaradas.add(nombre);
}

function usarVariable(nombre) {
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i].has(nombre)) {
            variablesUsadas.add(nombre);
            return true;
        }
    }
    errores.push(`Error semántico: La variable '${nombre}' no está declarada.`);
    return false;
}

function validarUsoDeVariables(nodo) {
    if (!nodo) return;
    switch (nodo.type) {
        case 'VariableDeclaration':
            entrarScope();
            nodo.declarations.forEach(decl => {
                if (decl.id && decl.id.name) {
                    declararVariable(decl.id.name);
                }
            });
            salirScope();
            break;
        case 'Identifier':
            usarVariable(nodo.name);
            break;
    }
    for (let prop in nodo) {
        if (nodo.hasOwnProperty(prop) && typeof nodo[prop] === 'object') {
            validarUsoDeVariables(nodo[prop]);
        }
    }
}

function determinarTipo(nodo) {
    switch (nodo.type) {
        case 'Literal':
            if (typeof nodo.value === 'number') return 'number';
            if (typeof nodo.value === 'boolean') return 'boolean';
            if (typeof nodo.value === 'string') return 'string';
            return 'unknown';
        case 'Identifier':
            // Lógica simplificada para retornar un tipo predefinido
            return 'number';
        default:
            return 'unknown';
    }
}

function validarExpresiones(nodo) {
    if (!nodo) return;
    if (nodo.type === 'BinaryExpression') {
        const tipoIzq = determinarTipo(nodo.left);
        const tipoDer = determinarTipo(nodo.right);

        if (['+', '-', '*', '/', '%'].includes(nodo.operator)) {
            if (tipoIzq !== 'number' || tipoDer !== 'number') {
                errores.push(`Error de tipo: Operación aritmética ${nodo.operator} entre tipos no numéricos.`);
            }
        } else if (['&&', '||'].includes(nodo.operator)) {
            if (tipoIzq !== 'boolean' || tipoDer !== 'boolean') {
                errores.push(`Error de tipo: Operación booleana ${nodo.operator} entre tipos no booleanos.`);
            }
        }
        // Sobrecarga del operador '+'
        if (nodo.operator === '+' && (tipoIzq === 'string' || tipoDer === 'string')) {
            console.log('Warning: Sobrecarga del operador + para concatenación de cadenas.');
        }
    }
    validarExpresiones(nodo.left);
    validarExpresiones(nodo.right);
}

function mostrarWarnings() {
    // Variables declaradas pero no usadas
    variablesDeclaradas.forEach(varName => {
        if (!variablesUsadas.has(varName)) {
            console.log(`Warning: La variable '${varName}' está declarada pero no usada.`);
        }
    });
}


export function updateAnalysis() {
    const code = editor.getValue();
    document.getElementById("errorSection").innerHTML = '';
    try {
        const ast = esprima.parseScript(code, { tolerant: true });
        validarUsoDeVariables(ast);
        validarExpresiones(ast);

        // Mostrar errores acumulados
        errores.forEach(error => {
            const errorMessage = `<span class="error-message">${error}</span>`;
            document.getElementById("errorSection").innerHTML += errorMessage + '<br>';
        });

        const expresionBinaria = encontrarPrimerExpresionBinaria(ast);

        if (expresionBinaria) {
            const expresionNPI = aNotacionPolacaInversa(expresionBinaria);
            document.getElementById("errorSection").innerHTML = `<span class="success-message">Expresión en Notación Polaca Inversa: ${expresionNPI}</span>`;
        } else if (document.getElementById("errorSection").innerHTML === '') {
            document.getElementById("errorSection").innerHTML = '<span class="success-message">Tu código compila correctamente</span>';
        }

        // Mostrar advertencias
        mostrarWarnings();

        const tokens = esprima.tokenize(code, { range: true });
        let tokenTable = document.getElementById("tokenTable");
        tokenTable.innerHTML = '';

        let headerRow = tokenTable.insertRow(-1);
        let headers = ["Tipo de Token", "Valor", "Descripción"];
        headers.forEach(headerText => {
            let headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });

        tokens.forEach(token => {
            let row = tokenTable.insertRow(-1);
            let cellTipo = row.insertCell(0);
            cellTipo.textContent = traducirTipoToken(token.type);

            let cellValor = row.insertCell(1);
            cellValor.textContent = token.value;

            let cellDescripcion = row.insertCell(2);
            cellDescripcion.textContent = tokenDescriptions[token.type] || 'Descripción no disponible';
        });

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