'use strict';

const display =document.getElementById('display');
const numeros = document.querySelectorAll('[id *= tecla]'); 
const operadores = document.querySelectorAll('[id *= operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) =>{
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }
    else{
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero)); 

const operacaoPendente = () => operador != undefined; 

const calcular = () =>{
    if (operacaoPendente()){
        const numeroAtual = parseFloat( display.textContent.replace(',', '.')); 
        novoNumero = true; 
        const resultado = eval (`${numeroAnterior} ${operador} ${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

const selecionarOperador = (evento) =>{
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
        console.log(operador);
    }

}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const acionarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', acionarIgual);

const limparDisplay = ()=> display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () =>{
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// textcontent retorna um array (cadeia de caracter) = slice utilizado para array
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1); // -1 = conta de tras p frente
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'        : 'tecla2',
    '3'        : 'tecla3',
    '4'        : 'tecla4',
    '5'        : 'tecla5',
    '6'        : 'tecla6',
    '7'        : 'tecla7',
    '8'        : 'tecla8',
    '9'        : 'tecla9',
    '+'         : 'operadorSoma',
    '-'         : 'operadorSubtracao',
    '*'         : 'operadorMultiplicacao',
    '/'         : 'operadorDivisao',
    '='         : 'igual',
    ','         : 'decimal',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo'
}

const mapearTeclado = (evento) =>{
    const tecla = evento.key; // tecla digitada, console.log(tecla);
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
     // varre todo o array da função, pegando apenas as chaves , indexOf p verificar se existe a telca
     // indexOf traz numero, se for pressionado trará um numero diferent de -1
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();  

}

document.addEventListener('keydown', mapearTeclado);