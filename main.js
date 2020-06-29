"use strict"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ballImage = new Image();
ballImage.src = 'images/ball.png';


let start, anim, ball;

function playGame() {
    start = true;
    init(); // иннициализация переменных
    game(); // запуск анимации
};

function init() {
    start = true;
    ball = {
        x: 500,
        y: 50,
        w: 55,
        h: 55,
    };
    document.addEventListener('click', rebound);
};

function game() {
    if (start) {
        update();
        render();
        anim = requestAnimationFrame(game);
    }
};

function render() {
    // background
    ctx.save();
    ctx.fillStyle = 'rgba(36, 50, 156, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // ball
    ctx.drawImage(ballImage, ball.x, ball.y, ball.w, ball.h);
};

function update() {

};




function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
};

function bounce(timeFraction) {
    for (let a = 0, b = 1; true; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
};

function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}

function rebound() {
    let to = canvas.height - (ball.h + 200);
    let width = 1200;
    animate({
        duration: 3000,
        timing: makeEaseOut(bounce),
        draw(progress) {
            ball.y = to * progress + 200;
        }
    });
    animate({
        duration: 3000,
        timing: makeEaseOut(quad),
        draw: function (progress) {
            ball.x = width * progress;
        }
    });
};

function animate(options) {
    let start = performance.now();
    requestAnimationFrame(function animation(time) {
        // timeFraction от 0 до 1
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // текущее состояние анимации
        let progress = options.timing(timeFraction)

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animation);
        }

    });
};



window.onload = () => playGame(); 
