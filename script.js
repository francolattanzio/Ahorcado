const palabras = [
    'diligencia',
    'permanente',
    'manopla',
    'muralla',
    'chillar',
    'naturaleza',
    'condimento',
    'signo',
    'falsificar',
    'escorpion',
    'karateca',
    'cuerda',
    'retrato',
    'gotera',
    'pellizcar',
    'club',
    'volcar',
    'obligatorio',
    'rodilla',
    'camilla',
    'corriente',
    'aplaudir',
    'craneo',
    'autopsia',
    'cartucho',
    'costura',
    'gracias',
    'atascar',
    'balbucear',
    'anchoa',
    'fotocopiadora',
    'lagartija',
    'gitano',
    'alpinismo',
    'municipio',
    'colmillo',
    'disparar',
    'alianza',
    'temblar',
    'estallar',
    'hermanastro',
    'bisonte',
    'sacudida',
    'hamster',
    'foco',
    'almeja',
    'avellana',
    'hoyuelo',
    'poster',
    'mercenario',
    'tiza',
    'homosexual',
    'bochorno',
    'extinguidor',
    'carrusel',
    'ventilador',
    'interprete',
    'periodista',
    'respaldo',
    'tenaza',
    'hormona',
    'mormon',
    'adventismo',
    'ciempies',
    'descubridor',
    'empinado',
    'ecologista',
    'mosquitero',
    'empastar',
    'marroqui',
    'enredadera',
    'antepasado',
    'hilvan',
    'agrupar',
    'gremio',
    'hospedaje',
    'flaco',
    'compartimiento',
    'sonrojarse',
    'espectacular',
    'jaguar',
    'limosna',
    'cerilla',
    'corteza',
    'ecologismo',
    'marchitado',
    'yunque',
    'costa',
    'jeringa',
    'chicle',
    'aleron',
    'reflejar',
    'peruano',
    'historieta',
    'abuelito',
    'concubina',
    'lapsus',
    'morsa',
    'viuda',
    'tartamudo'
]


const boton_comenzar = document.getElementById('comenzar_juego');
boton_comenzar.addEventListener('click', iniciar);

const usuario = document.getElementById('jugador');
const advertencia = document.getElementById('advertencia');

let palabra = '';
const imagen = document.getElementById('imagen');
const botones_letras = document.querySelectorAll('#letras button');
let puntaje = 0;
let puntaje_total = 0;
let lista_palabras_usadas = [''];
let turno = 0;

let lista_jugadores = [];

let nombre_usuario;

let senial = 1;

let puesto1;
let puesto2;
let puesto3;




let posible_lista;

posible_lista = JSON.parse(localStorage.getItem('jugadores_listados'));

console.log(posible_lista);

if(posible_lista != null){
    lista_jugadores = posible_lista
}


if(lista_jugadores.length === 1){
    puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
    document.getElementById('puesto1').innerHTML = puesto1; 
}
else if(lista_jugadores.length === 2){
    puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
    document.getElementById('puesto1').innerHTML = puesto1;    
    puesto2 = 'top 2: ' + lista_jugadores[1].nombre + ' -> ' + lista_jugadores[1].puntos + ' puntos';
    document.getElementById('puesto2').innerHTML = puesto2;   
}
else if(lista_jugadores.length > 2){
    puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
    document.getElementById('puesto1').innerHTML = puesto1;    
    puesto2 = 'top 2: ' + lista_jugadores[1].nombre + ' -> ' + lista_jugadores[1].puntos + ' puntos';
    document.getElementById('puesto2').innerHTML = puesto2;    
    puesto3 = 'top 3: ' + lista_jugadores[2].nombre + ' -> ' + lista_jugadores[2].puntos + ' puntos';
    document.getElementById('puesto3').innerHTML = puesto3;
}




for(let i = 0; i < botones_letras.length; i++){
    botones_letras[i].disabled = true;
}


function iniciar(event){
    nombre_usuario = usuario.value;
    if(nombre_usuario != ''){
        if(senial === 0){
            document.getElementById('puntaje_total').innerHTML = 'Puntaje total: -';
        }
        senial++
        usuario.disabled = true;
        advertencia.innerHTML = '';
        imagen.src = 'ahorcados/ahorcado0.png';
        errores = 0;
        aciertos = 0;
        puntaje = 8;


        document.getElementById('respuesta').innerHTML = null;

        document.getElementById('intentos_restantes').innerHTML = 'Te quedan ' + puntaje + ' intentos';

        boton_comenzar.disabled = true;

        const palabra_misteriosa = document.getElementById('palabra_oculta');
        palabra_misteriosa.innerHTML = '';

        palabra = obtener_palabra();

        const cantidad_letras = palabra.length;

        for(let i = 0; i < botones_letras.length; i++){
            botones_letras[i].disabled = false;
        }

        for(let i = 0; i < cantidad_letras; i++){
            const hueco = document.createElement('span');
            palabra_misteriosa.appendChild(hueco);
        }
    }
    else{
        advertencia.innerHTML = '¡Coloca tu nombre! ¿A caso no ves que existo?';
    }

}

console.log(boton_comenzar);



function obtener_palabra(){
    const cantidad_palabras = palabras.length;
    let palabra_candidata;
    for(let i = 0; i < palabras.length; i++){
        const valor_random = numero_random(cantidad_palabras);
        palabra_candidata = palabras[valor_random];
        if(!lista_palabras_usadas.includes(palabra_candidata)){
            break;
        }
    }

    console.log(palabra_candidata);
    lista_palabras_usadas.push(palabra_candidata);
    console.log(lista_palabras_usadas)
    return palabra_candidata
}



function numero_random(x){
    const valor_random = Math.floor(Math.random() * x);
    return valor_random
}



for(let i = 0; i < botones_letras.length; i++){
    botones_letras[i].addEventListener('click', seleccionar_letra);
}



function seleccionar_letra(event){
    const cifrado = document.querySelectorAll('#palabra_oculta span')
    const boton = event.target;
    boton.disabled = true;

    const letra = boton.innerHTML;

    let acierto = false

    for(let i = 0; i < palabra.length; i++){
        if(palabra[i] === letra){
            cifrado[i].innerHTML = letra;
            acierto = true;
            aciertos++;
        }
    }

    if(acierto === false){
        errores++;
        puntaje--;
        document.getElementById('intentos_restantes').innerHTML = 'Te quedan ' + puntaje + ' intentos';
        const fuente = `ahorcados/ahorcado${errores}.png`;
        imagen.src = fuente;
    }

    if(errores === 8){

        let sonido1 = new Audio("ahorcados/waaa.mp3");
        sonido1.play();

        document.getElementById('respuesta').innerHTML = 'Fallaste. La palabra era: ' + palabra;
        /** aqui se pondra un contador de partidas para determinar si alcanzo la ronda 10 o no**/
        turno++;
        if(turno === 10){ /**CAMBIAR AL FINAL**/

            finalizar();
        }
        else{
            for(let i = 0; i < botones_letras.length; i++){
                botones_letras[i].disabled = true;
            }
            const tiempo1 = setTimeout(iniciar, 4000);
        }
    }
    else if (aciertos === palabra.length){

        let sonido2 = new Audio("ahorcados/yippie.mp3");
        sonido2.play();

        imagen.src = 'ahorcados/noahorcado.png'
        document.getElementById('respuesta').innerHTML = '¡Has acertado!';
        puntaje_total += puntaje;
        document.getElementById('puntaje_total').innerHTML = 'Puntaje total: ' + puntaje_total;
        turno++;
        if(turno === 10){ /**CAMBIAR AL FINAL**/
            finalizar();
        }
        else{
            for(let i = 0; i < botones_letras.length; i++){
                botones_letras[i].disabled = true;
            }
            const tiempo2 = setTimeout(iniciar, 5000);
        }
    }
}



function finalizar(){
    for(let i = 0; i < botones_letras.length; i++){
        botones_letras[i].disabled = true;
    }

    agregar_jugador(nombre_usuario,puntaje_total);



    localStorage.removeItem('jugadores_listados');


    localStorage.setItem('jugadores_listados', JSON.stringify(lista_jugadores))






    usuario.disabled = false;

    boton_comenzar.disabled = false;
    puntaje_total = 0;
    turno = 0;
    lista_palabras_usadas = [''];
    senial = 0;
    if(lista_jugadores.length === 1){
        puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
        document.getElementById('puesto1').innerHTML = puesto1; 
    }
    else if(lista_jugadores.length === 2){
        puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
        document.getElementById('puesto1').innerHTML = puesto1;    
        puesto2 = 'top 2: ' + lista_jugadores[1].nombre + ' -> ' + lista_jugadores[1].puntos + ' puntos';
        document.getElementById('puesto2').innerHTML = puesto2;    
    }
    else if(lista_jugadores.length > 2){
        puesto1 = 'top 1: ' + lista_jugadores[0].nombre + ' -> ' + lista_jugadores[0].puntos + ' puntos';
        document.getElementById('puesto1').innerHTML = puesto1;    
        puesto2 = 'top 2: ' + lista_jugadores[1].nombre + ' -> ' + lista_jugadores[1].puntos + ' puntos';
        document.getElementById('puesto2').innerHTML = puesto2;    
        puesto3 = 'top 3: ' + lista_jugadores[2].nombre + ' -> ' + lista_jugadores[2].puntos + ' puntos';
        document.getElementById('puesto3').innerHTML = puesto3;
    }

    document.getElementById('intentos_restantes').innerHTML = 'Te quedan - intentos';



}



function agregar_jugador(x, y) {
    const player = {
        nombre: x,
        puntos: y,
    }
    let i = lista_jugadores.length;
    while (i > 0 && lista_jugadores[i - 1].puntos < y) {
        i--;
    }
    lista_jugadores.splice(i, 0, player);
}



boton_comenzar.disabled = false;
