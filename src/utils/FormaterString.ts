export const  toCamelCase = (str: string): string => {
    return str
    .toLowerCase() // Convierte toda la cadena a minúsculas
    .split(' ') // Divide la cadena en palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(' '); // Une las palabras de nuevo en una cadena
  }