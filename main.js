"use strict"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ballImage = new Image();
ballImage.src = 'images/ball.png';
const ringImage = new Image();
ringImage.src = 'images/ring.png';


let start, anim, ball, platform, ring;

function playGame() {
    start = true;
    init(); // иннициализация переменных
    game(); // запуск анимации
};

function init() {
    start = true;
    ball = {
        x: 50,
        y: 50,
        // y: canvas.height - 105,
        w: 55,
        h: 55,
        dx: 10,
        dy: 5,
        g: 1.06,
        start: false,

    };
    platform = {
        x: 0,
        y: canvas.height - 50,
        w: canvas.width,
        h: 100
    };
    ring = {
        x: canvas.width - 400,
        y: 100,
        w: 400,
        h: 200
    }
    // document.addEventListener('click', rebound);
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

    // platform
    ctx.save();
    ctx.fillStyle = 'rgba(10, 74, 8, 1)';
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    ctx.restore();

    // ring
    ctx.drawImage(ringImage, ring.x, ring.y, ring.w, ring.h);
};

function update() {
    if (ball.start) {

        if (ball.y + ball.h >= platform.y) {
            ball.dy = -ball.dy;
            ball.y += ball.dy;
        } else {
            ball.y += ball.dy;
            ball.dy *= ball.g;
        }
    }
};

function rebound() {
    ball.start = true;
    ball.y = 50;
};


/* 
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
    let to = canvas.height - (ball.h + 100);
    let width = 1200;
    animate({
        duration: 3000,
        timing: makeEaseOut(bounce),
        draw(progress) {
            ball.y = to * progress + 100;
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

 */

window.onload = () => playGame(); 
