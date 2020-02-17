'use strict';

import { startTime } from "./stopwatch.js";
import { stopTime } from "./stopwatch.js";
import { resetTime } from "./stopwatch.js";
let interval;

const htmlElements = {
	links: document.querySelectorAll('.links a'),
	buttons: document.querySelectorAll('.buttons button'),
	tabs: document.querySelectorAll('.tabs > div'),
	clockOutput: document.querySelector('div.tabs .clockContainer span'),
	stopwatchOutput: document.querySelector('div.tabs .stopwatchContainer span')
};

function Tabs() {}

Tabs.prototype.init = function() {

	htmlElements.links.forEach(function () {
		addEventListener('click', linkClicked);
	})
};

function removeClass(elements) {
	elements.forEach(function (elem) {
		elem.className = elem.dataset.mode;
	})
}

function addClass(className, elements) {
	elements.forEach(function (elem) {
		elem.className = elem.dataset.mode + ' ' + className;
	})
}

function linkClicked() {
	selectLink(this.event.target);
	activateContent(this.event.target);
}

function selectLink(elem) {
	removeClass(htmlElements.links);
	elem.classList.add('selected');
}

function activateContent(elem) {
	let target = elem.dataset.mode;

	if(target !== 'start' && target !== 'stop' && target !== 'reset') {
		addClass('hidden', htmlElements.tabs);
	}

	htmlElements.tabs.forEach(function (tab) {
		if(tab.dataset.mode === target){
			tab.className = tab.dataset.mode;
		}
	});

	if(target === 'start'){
		interval = setInterval(startTime, 1000);
	}
	if(target === 'stop') {
		stopTime(interval);
	}
	if(target === 'reset') {
		resetTime(interval);
	}
}

export { Tabs };
export { htmlElements };
