"use strict"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ballImage = new Image();
ballImage.src = 'images/ball.png';
const ringImage = new Image();
ringImage.src = 'images/ring.png';


let start, anim, ball, platform, ring, thr;

function playGame() {
    start = true;
    init(); // иннициализация переменных
    game(); // запуск анимации
};

function init() {
    start = true;
    ball = {
        x: 350,
        y: 250,
        w: 55,
        h: 55,
        dx: 4.5,
        dy: 5,
        g: 0.3,
        rebound: false,
        throw: false,
        fall: false,

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
    };
    thr = {
        x: 0,
        y: 0,
        radius: 300,
        degree: Math.PI / 8,
        coefRadius: 1 / 250, // забить мяч можно только при ball.y = 250
    }
    document.addEventListener('mousedown', hit);

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
    if (ball.x > ring.x + 55 && ball.y < ring.y + 155 && ball.y > ring.y + 50 || ball.x >= canvas.width - 50 && ball.y > ring.y + 155) {
        ball.rebound = true;
    }

    if (ball.x > ring.x + 20 && ball.y > ring.y + 145 && ball.y < ring.y + 150) {
        ball.fall = true;
        ball.throw = false;
    }

    if (ball.fall) {
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
    };
    if (ball.throw) {
        if (ball.y + ball.h >= platform.y) {
            ball.dy = 12;
            ball.fall = true;

            ball.throw = false;
        }
        ball.x = thr.x - Math.cos(thr.degree) * thr.radius;
        ball.y = thr.y - Math.sin(thr.degree) * thr.radius;
        thr.degree += Math.PI / 90;
    };
    if (ball.rebound) {
        if (ball.x > 350) {
            ball.fall = true;
            ball.throw = false;
            ball.x -= ball.dx;
        } else {
            ball.rebound = false;
        }

    };
};

function hit() {
    if (event.clientX > ball.x && event.clientX < ball.x + ball.w && event.clientY > ball.y && event.y < ball.y + ball.h) {
        ball.throw = true;
        ball.fall = false;
        thr.radius /= ball.y * thr.coefRadius;
        thr.x = ball.x + Math.cos(thr.degree) * thr.radius;
        thr.y = ball.y + Math.sin(thr.degree) * thr.radius;
    } else {
        ball.fall = true;
        ball.throw = false;
        ball.dy += 16;
        thr.degree = Math.PI / 8;
        thr.radius = 300;
    }

};


window.onload = () => playGame(); 
