export function traducirTipoToken(tipoToken) {
    const traducciones = {
        'Keyword': 'Palabra clave',
        'Identifier': 'Identificador',
        'Numeric': 'Numérico',
        'String': 'Cadena',
        'Punctuator': 'Puntuador',
        'RegularExpression': 'Expresión regular',
        'Boolean': 'Booleano',
        'Null': 'Nulo',
        'Template': 'Plantilla de cadena',
        'Comment': 'Comentario',
        'WhiteSpace': 'Espacio en blanco',
        'Literal': 'Literal',
        'Undefined': 'Indefinido',
        'Object': 'Objeto',
        'Array': 'Arreglo',
        'Function': 'Función',
        'ArrowFunction': 'Función flecha',
        'Class': 'Clase',
        'Method': 'Método',
        'This': 'This',
        'Super': 'Super'
        // Añade más traducciones según sea necesario
    };
    return traducciones[tipoToken] || tipoToken; // Devuelve la traducción o el tipo original si no se encuentra traducción
}
