'use strict';

import { Tabs } from "./tabs.js";
import { Clock } from "./clock.js";
import { Stopwatch } from "./stopwatch.js";

const tabs = new Tabs();
const clock = new Clock();
const stopwatch = new Stopwatch();

function init() {
	tabs.init();
	clock.init();
	stopwatch.init();
}

init();

