'use strict';

import { htmlElements } from "./tabs.js";
import { checkTime } from "./clock.js";

let hou = 0;
let min = 0;
let sec = 0;
let reset = '0:00:00';


function Stopwatch() {}

Stopwatch.prototype.init = function () {
	htmlElements.stopwatchOutput.innerText = reset;
};

function startTime() {
	sec++;

	if(sec / 60 === 1){
		sec = 0;
		min++;

		if(min / 60 === 1){
			min = 0;
			hou++;
		}
	}

	htmlElements.stopwatchOutput.innerHTML = checkTime(hou) + ':' + checkTime(min) + ':' + checkTime(sec);
}

function stopTime(int){
	clearInterval(int);
}

function resetTime(int) {
	hou = 0;
	min = 0;
	sec = 0;
	htmlElements.stopwatchOutput.innerText = '00:00:00';
	stopTime(int);
}

export { Stopwatch };
export { startTime };
export { stopTime };
export { resetTime };