'use strict';

const canvas = document.getElementById('canvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');

// create the unit
const box = 40;

// load images

const field = new Image();
field.src = 'field.png';

const mouseImg = new Image();
mouseImg.src = 'mouse.png';

// create the snake

let snake = [];

snake[0] = {
	x : 8 * box,
	y : 8 * box
};

// create the food

let mouse = {
	x : Math.floor(Math.random()*18) * box,
	y : Math.floor(Math.random()*18) * box
};

// create the score var

let points = 0;
document.querySelector('span').innerHTML = points;

// control the snake

let dir;

document.addEventListener('keydown', direction);

function direction(event) {

	if (event.keyCode === 37 && dir !== 'right') {
		dir = 'left';
	} else if(event.keyCode === 38 && dir !== 'down') {
		dir = 'up';
	} else if(event.keyCode === 39 && dir !== 'left') {
		dir = 'right';
	} else if(event.keyCode === 40 && dir !== 'up') {
		dir = 'down';
	}
}

function touchBody(head, array) {
	for (let i = 0; i < array.length; i++){
		if (head.x === array[i].x && head.y === array[i].y) {
			return true;
		}
	}
}

// draw to the canvas

 function draw () {

	ctx.drawImage(field, 0, 0);

	for (let i = 0; i < snake.length; i++){

		ctx.fillStyle = ( i === 0) ? 'black' : 'darkslateblue';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = 'black';
		ctx.strokeRect(snake[i].x - 0.5 , snake[i].y - 0.5, box, box);
	}

	ctx.drawImage(mouseImg, mouse.x, mouse.y);

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// which direction
	if( dir === 'left') snakeX -= box;
	if( dir === 'up') snakeY -= box;
	if( dir === 'right') snakeX += box;
	if( dir === 'down') snakeY += box;

	// add new head

	let newHead = {
		x : snakeX,
		y : snakeY
	};

	// eat food
	if (snakeX === mouse.x && snakeY === mouse.y) {
		points++;
		document.querySelector('span').innerHTML = points;
		mouse = {
			x : Math.floor(Math.random()*18) * box,
			y : Math.floor(Math.random()*18) * box
		}
	} else {
		// remove the tail
		snake.pop();
	}

	// game over

	if (snakeX < 0 || snakeX >= 18 * box || snakeY < 0
		|| snakeY >= 18 * box || touchBody(newHead, snake)) {
		clearInterval(game);
	}

	snake.unshift(newHead);

}

// call draw function

function StartGame() {}

let game;

StartGame.prototype.init = function() {
	game = setInterval(draw,150);
};


export { StartGame };
export { points };
