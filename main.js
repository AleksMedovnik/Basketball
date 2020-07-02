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
        x: 350,
        y: 50,
        w: 55,
        h: 55,
        dx: 10,
        dy: 5,
        g: 0.3,
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
        ball.g = (ball.dy < 0) ? 0.9 : 0.3;
        if (ball.y + ball.h >= platform.y && ball.dy <= 4) {
            ball.y = platform.y - ball.h;
        } else {
            if (ball.y + ball.h >= platform.y) {
                ball.dy = -ball.dy;
            }
            ball.y += ball.dy;
            ball.dy += ball.g;
        }
    }
};

function rebound() {
    ball.start = true;
    ball.y = 50;
};


window.onload = () => playGame(); 
