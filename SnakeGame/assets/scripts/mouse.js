import snake from "./snake.js";


class Mouse {

    constructor() {
        this.mousePosition = {};
        this.mouseImage = document.createElement('img');
        this.mouseImage.src = './assets/images/mouse.png';
    }

    addMouse() {
        this.mousePosition.x = Math.floor(Math.random()*18) * snake.boxUnit,
        this.mousePosition.y = Math.floor(Math.random()*18) * snake.boxUnit

        // check that mouse not on snake
        for(let i = 0; i < snake.snakeArray.length; i++) {
            if(snake.snakeArray[i].x === this.mousePosition.x
            && snake.snakeArray[i].y === this.mousePosition.y){
                return this.addMouse;
            }
        }
    }

}

export default new Mouse();