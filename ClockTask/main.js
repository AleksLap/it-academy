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

// show clock

function onIntervalNextTick() {
    const time = new Date();
    const hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
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

htmlElements.clock.parentElement.addEventListener('click', function (event) {
    let links = event.target.parentElement.children;
    for(let i = 0; i < links.length; i++){
        let elem = links[i];
        elem.className = elem.dataset.mode;
    }

    event.target.className += ' selected';
    showButtons(event.target.dataset.mode);
    if(event.target.dataset.mode === 'stopwatch'){
        stopWatch();
    }

});

// show buttons

function showButtons(button) {
    let buttons = htmlElements.startBtn.parentElement.children;
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

function stopWatch(){
    clearInterval(clock);
    htmlElements.output.innerHTML = '00:00:00';
    let buttons = htmlElements.startBtn.parentElement;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    buttons.addEventListener('click', function (event) {
        let targetName = event.target.className;
        if(targetName === 'start'){
            function startTime() {

                seconds++;

                if(seconds / 60 === 1){
                    seconds = 0;
                    minutes++;

                    if(minutes / 60 === 1){
                        minutes = 0;
                        hours++;
                    }
                }

                htmlElements.output.innerHTML = checkTime(hours) + ':' + checkTime(minutes) + ':' + checkTime(seconds);
            }

           interval = setInterval(startTime, 1000);
        }
        if(targetName === 'stop'){
            clearInterval(interval);
        }
        if(targetName === 'reset'){
            hours = 0;
            minutes = 0;
            seconds = 0;
            htmlElements.output.innerHTML = '00:00:00';
        }
    })
}
