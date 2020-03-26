import { startGame, reset, ChoseDifficulty } from "./draw.js";

const startButton = document.getElementById('startGame');
const resetButton = document.getElementById('reset');
const choseDifficulty = new ChoseDifficulty();

function init() {
  startButton.onclick = startGame;
  resetButton.onclick = reset;
  choseDifficulty.init();
}

init();


