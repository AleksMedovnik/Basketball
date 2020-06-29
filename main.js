"use strict"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ballImage = new Image();
ballImage.src = 'images/ball.png';


let start, anim;

function playGame() {
    start = true;
    init(); // иннициализация переменных
    game(); // запуск анимации
};
function init() {
    start = true;
};
function game() {
    if (start) {
        update();
        render();
        anim = requestAnimationFrame(game);
    }
};
function render(){
    ctx.drawImage(ballImage, 100, 400, 55, 55);
};
function update(){

};





window.onload = () => playGame(); 
