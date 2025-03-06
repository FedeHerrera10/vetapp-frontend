export const generarPassword = (longitud:number = 10) => {
    const caracteres : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password : string = '';

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio : number = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(indiceAleatorio);
    }

    return password;
}

