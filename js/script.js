const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const circle = {
    x: 140,
    y: canvas.height / 2,
    radius: 70,
    color: getRandomColor()
};

const arrow = {
    headlen: 18,
    startX: canvas.width - 100,
    startY: canvas.height / 2,
    color: "#222"
};

const arrowStartX = canvas.width - 100;
const arrowStartY = canvas.height / 2;
const arrowTargetX = circle.x + circle.radius + 30;
const arrowTargetY = canvas.height / 2;

let animating = false;

function getRandomColor() {
    return 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ')';
}

function drawArrow(ctx, fromX, fromY, toX, toY, color) {
    const headlen = 18;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headlen * Math.cos(angle - Math.PI / 7),
        toY - headlen * Math.sin(angle - Math.PI / 7)
    );
    ctx.lineTo(
        toX - headlen * Math.cos(angle + Math.PI / 7),
        toY - headlen * Math.sin(angle + Math.PI / 7)
    );
    ctx.lineTo(toX, toY);
    ctx.lineTo(
        toX - headlen * Math.cos(angle - Math.PI / 7),
        toY - headlen * Math.sin(angle - Math.PI / 7)
    );
    ctx.fillStyle = color;
    ctx.fill();
}

function drawScene(arrowX, arrowY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#222";
    ctx.stroke();

    drawArrow(ctx, arrowX, arrowY, arrowX - 80, arrowY, arrow.color);
}

function reset() {
    animating = false;
    drawScene(arrowStartX, arrowStartY);
}

function animateArrow() {
    if (animating) return;
    animating = true;

    const startX = arrowStartX;
    const endX = arrowTargetX;
    const totalFrames = 30;
    let frame = 0;

    function animate() {
        if (!animating) return;

        frame++;
        const currentX = startX + (endX - startX) * (frame / totalFrames);

        drawScene(currentX, arrowStartY);

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            circle.color = getRandomColor();
            drawScene(endX, arrowStartY);
            animating = false;
        }
    }
    animate();
}

reset();

document.getElementById('hitBtn').onclick = function() {
    if (!animating) animateArrow();
};
document.getElementById('resetBtn').onclick = function() {
    animating = false;
    reset();
};
