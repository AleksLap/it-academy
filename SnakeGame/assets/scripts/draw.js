import mouse from "./mouse.js";
import snake from "./snake.js";

const buttons = document.querySelectorAll('button.difficulty');

let gameSpeed = 300;
let game;
let changingDirection = false;

// add keydown event
document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    if (event.keyCode === 37 && snake.movingDirection !== 'right') {
        snake.movingDirection = 'left';
    } else if (event.keyCode === 38 && snake.movingDirection !== 'down') {
        snake.movingDirection = 'up';
    } else if (event.keyCode === 39 && snake.movingDirection !== 'left') {
        snake.movingDirection = 'right';
    } else if (event.keyCode === 40 && snake.movingDirection !== 'up') {
        snake.movingDirection = 'down';
    }
}

function drawCanvas () {

    snake.context.drawImage(snake.fieldImage, 0, 0);
    snake.context.drawImage(mouse.mouseImage, mouse.mousePosition.x, mouse.mousePosition.y);

    snake.drawSnake();

    // old head position
    let snakeX = snake.snakeArray[0].x;
    let snakeY = snake.snakeArray[0].y;

    // which direction
    if( snake.movingDirection === 'left') snakeX -= snake.boxUnit;
    if( snake.movingDirection === 'up') snakeY -= snake.boxUnit;
    if( snake.movingDirection === 'right') snakeX += snake.boxUnit;
    if( snake.movingDirection === 'down') snakeY += snake.boxUnit;

    snake.eatingMouse(snakeX, snakeY);

    // add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    snake.hittingTheWallOrBody(snakeX, snakeY, newHead);
    snake.addNewHeadToArray(newHead);
}

function clearCanvas() {
    snake.context.drawImage(snake.fieldImage, 0, 0);
}

function startGame() {
    let i = 4;

    setTimeout(function tick() {
        if (i > 1) {
            i -= 1;
            clearCanvas();
            snake.context.font = 'italic bold 148px Indie Flower';
            snake.context.fillStyle = "darkslateblue";
            snake.context.strokeStyle = "black";
            snake.context.fillText(i, 350, 350);
            setTimeout(tick, 1000);
        } else {
            clearCanvas();
            game = setInterval(function () {
                changingDirection = false;
                drawCanvas();
            }, gameSpeed);
        }
    }, 1000);
}

function reset() {
    location.reload();
}

// set difficulty section
function ChoseDifficulty() {}

ChoseDifficulty.prototype.init = function () {
    buttons.forEach(function () {
        addEventListener('click', buttonClicked);
    })
};


function buttonClicked() {
    let button = this.event.target;
    let check = button.dataset.mode;

    if (check !== undefined) {
        removeClass(buttons);
        selectButton(this.event.target);
        setDifficulty(this.event.target);
        console.log(this.event.target);
    }
}

function selectButton(button) {
    button.classList.add('selected');
}

function removeClass() {
    buttons.forEach(function (button) {
        button.classList.remove('selected');
    })
}

function setDifficulty(button) {
    let difficulty = button.dataset.mode;

    if (difficulty === 'easy') {
        gameSpeed = 300;
        snake.diffucultyFactor = 1;
    } else if (difficulty === 'medium') {
        gameSpeed = 200;
        snake.diffucultyFactor = 2;
    } else  if (difficulty === 'hard') {
        gameSpeed = 100;
        snake.diffucultyFactor = 3;
    }
}


// add first mouse
mouse.addMouse();

export { startGame, reset, ChoseDifficulty, game };


