'use strict';

import { htmlElements } from "./tabs.js";

function Clock() {}

Clock.prototype.init = function () {
	setInterval(onIntervalNextTick, 1000);
};

function onIntervalNextTick() {
	let time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	hours = checkTime(hours);
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	htmlElements.clockOutput.innerText = hours + ':' + minutes + ':' + seconds;
}

function checkTime(i) {
	if(i < 10) {
		i = "0" + i.toString();
	}
	return i;
}

export { Clock };
export { checkTime };