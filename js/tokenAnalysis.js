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

const identificadoresGlobales = new Set([
    "window", "document", "navigator", "screen", "history", "location",
    "fetch", "localStorage", "sessionStorage", "alert", "confirm", "prompt",
    "global", "process", "Buffer", "console", "module", "require",
    "setTimeout", "clearTimeout", "setInterval", "clearInterval",
    "URL", "URLSearchParams", "log"
]);


function usarVariable(nombre) {
    if (identificadoresGlobales.has(nombre)) {
        return true;  // Asume que es válido y no muestra error
    }
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i].has(nombre)) {
            variablesUsadas.add(nombre);
            return true;
        }
    }
    errores.push(`Error semántico: La variable '${nombre}' no está declarada.`);
    return false;
}


// Función corregida para validar variables dentro del ámbito adecuado.
function validarUsoDeVariables(nodo) {
    if (!nodo) return;
    switch (nodo.type) {
        case 'VariableDeclaration':
            // Entrar en un nuevo ámbito si es necesario
            entrarScope();
            nodo.declarations.forEach(decl => {
                if (decl.id && decl.id.name) {
                    declararVariable(decl.id.name); // Declarar variables
                }
            });
            break;
        case 'MemberExpression':
            // Verificar si el objeto es un identificador y no está en los identificadores globales
            if (nodo.object && nodo.object.type === 'Identifier' && !identificadoresGlobales.has(nodo.object.name)) {
                usarVariable(nodo.object.name); // Usar la variable identificada
            }
            break;
        case 'Identifier':
            usarVariable(nodo.name); // Verificar uso de identificadores
            break;
    }

    // Validar recursivamente todos los sub-nodos
    for (let prop in nodo) {
        if (nodo.hasOwnProperty(prop) && typeof nodo[prop] === 'object') {
            validarUsoDeVariables(nodo[prop]);
        }
    }

    // Salir del ámbito después de procesar todas las declaraciones
    if (nodo.type === 'VariableDeclaration') {
        salirScope();
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
            // Retorna 'unknown' si el tipo no es claro
            return 'unknown';
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
    // Limpiar sección de errores sólo al inicio del análisis
    document.getElementById("errorSection").innerHTML = '';
    errores.length = 0;  // Limpiar los errores previos

    try {
        const ast = esprima.parseScript(code, { tolerant: true });
        validarUsoDeVariables(ast);
        validarExpresiones(ast);

        // Verificar si hay errores y mostrarlos
        if (errores.length > 0) {
            errores.forEach(error => {
                const errorMessage = `<span class="error-message">${error}</span><br>`;
                document.getElementById("errorSection").innerHTML += errorMessage;
            });
        } else {
            // No hay errores, intentar mostrar la expresión binaria
            const expresionBinaria = encontrarPrimerExpresionBinaria(ast);
            if (expresionBinaria) {
                const expresionNPI = aNotacionPolacaInversa(expresionBinaria);
                document.getElementById("errorSection").innerHTML += `<span class="success-message">Expresión en Notación Polaca Inversa: ${expresionNPI}</span><br>`;
            }
        }

        // Mostrar advertencias si no hay errores
        if (document.getElementById("errorSection").innerHTML === '') {
            document.getElementById("errorSection").innerHTML = '<span class="success-message">Tu código compila correctamente</span><br>';
            mostrarWarnings();
        }

        // Siempre mostrar los tokens
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
        let errorMessage = `<span class="error-message">Error de análisis: ${error.message}</span><br>`;
        document.getElementById("errorSection").innerHTML += errorMessage;
    }
}

export function adjustEditorHeight(editorInstance) {
    const newHeight = Math.max(editorInstance.getScrollInfo().height, 570) + 'px';
    editorInstance.getWrapperElement().style.height = newHeight;
    editorInstance.refresh();
}