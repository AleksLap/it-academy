import mouse from "./mouse.js";
import { game } from "./draw.js";

class Snake {

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.fieldImage = document.createElement('img');
        this.fieldImage.src = './assets/images/field.png';
        this.boxUnit = 40;
        this.movingDirection = 'up';
        this.diffucultyFactor = 1;
        this.score = 0;
        this.scoreSpan = document.getElementById('score');
        this.scoreSpan.innerHTML = 'Score: ' + this.score.toString();
        this.bestScore = localStorage.getItem('bestScore');
        this.bestScoreSpan = document.getElementById('bestScore')
        this.bestScoreSpan.innerHTML = 'Best score: ' + this.bestScore;
        this.snakeArray = [
            {x: 8 * this.boxUnit, y: 8 * this.boxUnit},
            {x: 8 * this.boxUnit, y: 9 * this.boxUnit},
            {x: 8 * this.boxUnit, y: 10 * this.boxUnit}
        ];
    }

    // draw snake array on canvas
    drawSnake() {
        for (let i = 0; i < this.snakeArray.length; i++) {

            this.context.fillStyle = (i === 0) ? 'black' : 'darkslateblue';
            this.context.fillRect(this.snakeArray[i].x, this.snakeArray[i].y,
            this.boxUnit, this.boxUnit);

            this.context.strokeStyle = 'black';
            this.context.strokeRect(this.snakeArray[i].x - 0.5,
            this.snakeArray[i].y - 0.5, this.boxUnit, this.boxUnit);
        }
    }

    // check, did snake ate mouse, if not, remove the tail.
    eatingMouse(snakeX, snakeY) {
        if (snakeX === mouse.mousePosition.x && snakeY === mouse.mousePosition.y) {
            this.score += this.diffucultyFactor;
            this.scoreSpan.innerHTML = 'Score: ' + this.score.toString();
            mouse.addMouse();
        } else {
            this.snakeArray.pop();
        }
    }

    addNewHeadToArray(newHead) {
        this.snakeArray.unshift(newHead);
    }

    // check game over rules
    hittingTheWallOrBody(snakeX, snakeY, newHead) {
        let check = false;

        for (let i = 0; i < this.snakeArray.length; i++){
            if (newHead.x === this.snakeArray[i].x && newHead.y === this.snakeArray[i].y) {
                check = true;
            }
        }

        if (snakeX < 0 || snakeX >= 18 * this.boxUnit || snakeY < 0
            || snakeY >= 18 * this.boxUnit|| check) {
            this.setBestScore();
            clearInterval(game);
            this.endGame();
        }
    }

    setBestScore() {
        let score = this.score;
        let bestScore =  localStorage.getItem('bestScore');
        if (score > bestScore) {
            localStorage.setItem('bestScore', score);
        }

    }

    reset() {
        setTimeout(function () {
            location.reload();
        }, 3000)
    }


    endGame() {
        this.context.font = 'italic bold 78px Indie Flower';
        this.context.fillStyle = "white";
        this.context.strokeStyle = "black";
        this.context.fillText('Game Over', 200, 260);
        this.context.fillText('Score: ' + this.score.toString(), 240, 360);
        this.reset();
    }
}

export default new Snake();