let clock = setInterval(onIntervalNextTick, 1000);
let interval;

const htmlElements = {};
htmlElements.startBtn = document.querySelector('.container .buttons button.start');
htmlElements.stopBtn = document.querySelector('.container .buttons button.stop');
htmlElements.resetBtn = document.querySelector('.container .buttons button.reset');
htmlElements.clock = document.querySelector('.container .links .clock');
htmlElements.stopwatch = document.querySelector('.container .links .stopwatch');
htmlElements.timer = document.querySelector('.container .links .timer');
htmlElements.output = document.querySelector('.container .output');
htmlElements.links = document.querySelector('div.links');
htmlElements.buttons = document.querySelector('div.buttons');

// show clock

function onIntervalNextTick() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    htmlElements.output.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function checkTime(i) {
    if(i < 10) {
        i = "0" + i.toString();
    }
    return i;
}

// add events on links

htmlElements.links.addEventListener('click', function (event) {
    event.preventDefault();
    let links = htmlElements.links.children;
    let linkDataset = event.target.dataset.mode;

    for(let i = 0; i < links.length; i++){
        let elem = links[i];
        elem.className = elem.dataset.mode;
    }

    event.target.className += ' selected';
    showButtons(linkDataset);

    if(linkDataset === 'stopwatch'){
        stopWatch();
    }
    if(linkDataset === 'clock'){
       clock = setInterval(onIntervalNextTick, 1000);
       clearInterval(interval);
       resetTime();
    }

});

// show buttons

function showButtons(button) {
    let buttons = htmlElements.buttons.children;
    if(button === 'stopwatch'){
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = buttons[i].className.split(' ', 1).toString();
        }
    }
    else {
        for (let i = 0; i < buttons.length; i++){
            buttons[i].className += ' hidden';
        }
    }
}

// Stopwatch

let hou = 0;
let min = 0;
let sec = 0;

function stopWatch(){
    clearInterval(clock);
    htmlElements.output.innerHTML = '00:00:00';
}

htmlElements.buttons.addEventListener('click', function (event) {
    let targetName = event.target.className;

    if(targetName === 'start'){
        interval = setInterval(startTime, 1000);
    }
    if(targetName === 'stop'){
        stopTime()
    }
    if(targetName === 'reset'){
        resetTime();
    }
});


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

    htmlElements.output.innerHTML = checkTime(hou) + ':' + checkTime(min) + ':' + checkTime(sec);
}

 function stopTime(){
    clearInterval(interval);
}

 function resetTime() {
    hou = 0;
    min = 0;
    sec = 0;
    htmlElements.output.innerHTML = '00:00:00';
    stopTime();
}