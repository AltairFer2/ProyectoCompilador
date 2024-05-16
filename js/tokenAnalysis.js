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

// Inicializar el ámbito global al inicio del análisis
if (scopeStack.length === 0) {
    entrarScope(true);
}

function entrarScope(esFuncion = false) {
    scopeStack.push({ variables: new Set(), varVariables: new Set(), esFuncion });
}

function salirScope() {
    if (scopeStack.length > 0) {
        scopeStack.pop();
    } else {
        console.error("Intento de salir de un ámbito cuando no hay ninguno en la pila.");
    }
}

function declararVariable(nombre, tipo = 'let') {
    if (scopeStack.length === 0) {
        console.error("No hay ámbitos disponibles para declarar la variable.");
        return;
    }
    let currentScope = scopeStack[scopeStack.length - 1];
    if (tipo === 'function') {
        // Asegurarse de que las funciones sean tratadas como hoisted al ámbito más cercano de la función
        let funcScope = scopeStack.find(scope => scope.esFuncion);
        if (funcScope) {
            funcScope.variables.add(nombre);
        } else {
            scopeStack[0].variables.add(nombre);  // Añadir al ámbito global si no hay ámbito de función
        }
    } else if (tipo === 'var' && !currentScope.esFuncion) {
        // Agregar al ámbito global si estamos en un bloque y es 'var'
        scopeStack[0].variables.add(nombre);
    } else {
        currentScope.variables.add(nombre);
    }
    console.log(`Variable declarada: ${nombre}`);
}



function usarVariable(nombre) {
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        if (scopeStack[i].variables.has(nombre) || scopeStack[i].varVariables.has(nombre)) {
            variablesUsadas.add(nombre);
            console.log(`Variable usada: ${nombre}`);
            return true;
        }
    }
    if (identificadoresGlobales.has(nombre)) {
        return true;
    }
    errores.push(`Error semántico: La variable '${nombre}' no está declarada.`);
    return false;
}

function validarUsoDeVariables(nodo) {
    if (!nodo) return;

    // Controlar ámbito para bloques y funciones
    let necesitaNuevoScope = nodo.type === 'BlockStatement' || nodo.type === 'FunctionDeclaration';
    if (necesitaNuevoScope) {
        entrarScope(nodo.type === 'FunctionDeclaration');
    }

    switch (nodo.type) {
        case 'VariableDeclaration':
            nodo.declarations.forEach(decl => {
                if (decl.id && decl.id.name) {
                    declararVariable(decl.id.name, decl.kind);
                }
            });
            break;
        case 'FunctionDeclaration':
            declararFuncion(nodo.id.name, nodo.params);
            entrarScope(true);  // Suponemos que cada función crea un nuevo ámbito.

            nodo.params.forEach(param => {
                declararVariable(param.name, 'param');
            });
            break;
        case 'Identifier':
            usarVariable(nodo.name);
            break;
        case 'CallExpression':
            // Manejo de CallExpression cuando es un miembro de un objeto
            if (nodo.callee.type === 'MemberExpression') {
                if (nodo.callee.object && nodo.callee.property) {
                    // Ejemplo: objeto.método()
                    usarVariable(nodo.callee.object.name);  // Verifica el objeto
                    // opcionalmente verifica el método si es necesario: usarVariable(nodo.callee.property.name);
                }
            } else if (nodo.callee.type === 'Identifier') {
                const nombreFuncion = nodo.callee.name;
                const argsCount = nodo.arguments.length;
                validarFuncionYArgs(nombreFuncion, argsCount);
            }
            break;
        // Añade más casos según sea necesario
    }

    // Recorrer nodos hijos
    Object.keys(nodo).forEach(key => {
        if (typeof nodo[key] === 'object' && nodo[key] !== null) {
            validarUsoDeVariables(nodo[key]);
        }
    });

    if (necesitaNuevoScope) {
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
        if (nodo.operator === '+' && (tipoIzq === 'string' || tipoDer === 'string')) {
            console.log('Warning: Sobrecarga del operador + para concatenación de cadenas.');
        }
    }
    validarExpresiones(nodo.left);
    validarExpresiones(nodo.right);
}

function mostrarWarnings() {
    variablesDeclaradas.forEach(varName => {
        if (!variablesUsadas.has(varName)) {
            const warningMessage = `<span class="warning-message" style="color: yellow;">Warning: La variable '${varName}' está declarada pero no usada.</span><br>`;
            document.getElementById("errorSection").innerHTML += warningMessage;
        }
    });
}


export function updateAnalysis() {
    const code = editor.getValue();
    document.getElementById("errorSection").innerHTML = '';
    errores.length = 0;

    try {
        const ast = esprima.parseScript(code, { tolerant: true });
        validarUsoDeVariables(ast);
        validarExpresiones(ast);

        if (errores.length > 0) {
            errores.forEach(error => {
                const errorMessage = `<span class="error-message">${error}</span><br>`;
                document.getElementById("errorSection").innerHTML += errorMessage;
            });
        } else {
            const expresionBinaria = encontrarPrimerExpresionBinaria(ast);
            if (expresionBinaria) {
                const expresionNPI = aNotacionPolacaInversa(expresionBinaria);
                document.getElementById("errorSection").innerHTML += `<span class="success-message">Expresión en Notación Polaca Inversa: ${expresionNPI}</span><br>`;
            }
        }

        if (document.getElementById("errorSection").innerHTML === '') {
            document.getElementById("errorSection").innerHTML = '<span class="success-message">Tu código compila correctamente</span><br>';
            mostrarWarnings();
        }

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

const identificadoresGlobales = new Set([
    "window", "document", "navigator", "screen", "history", "location",
    "fetch", "localStorage", "sessionStorage", "alert", "confirm", "prompt",
    "global", "process", "Buffer", "console", "module", "require",
    "setTimeout", "clearTimeout", "setInterval", "clearInterval",
    "URL", "URLSearchParams", "log", "length"
]);

const funcionesDeclaradas = new Map();  // Almacena las funciones y la cantidad de parámetros que esperan

function declararFuncion(nombre, parametros) {
    funcionesDeclaradas.set(nombre, parametros.length);
    declararVariable(nombre, 'function'); // También registra la función como una variable (si aún no está registrado)
}

function validarFuncionYArgs(nombre, argsCount) {
    const parametrosEsperados = funcionesDeclaradas.get(nombre);
    if (parametrosEsperados !== undefined) {
        if (parametrosEsperados !== argsCount) {
            errores.push(`Error semántico: La función '${nombre}' espera ${parametrosEsperados} argumentos, pero se proporcionaron ${argsCount}.`);
        }
    } else {
        errores.push(`Error semántico: La función '${nombre}' no está declarada.`);
    }
}
