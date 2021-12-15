'use strict';

const display =document.getElementById('display');

const numeros = document.querySelectorAll('[id *= tecla]'); //seleciona os id que contém "tecla" no nome

const atualizarDisplay = (texto) =>{
    display.textContent += texto;
}

const insereNumero = (evento) => atualizarDisplay(evento.target.textContent);

//var recebera um evento que ocorrera no display.textcontent que recebe o evento que aponta para o texto

 //"varre" os elementos de um array (nodeList (ver no devTools))
numeros.forEach(numero => numero.addEventListener('click', insereNumero)); //adicionar a cada numero um evento, evento click e mandar p outra callback inserirNumero



