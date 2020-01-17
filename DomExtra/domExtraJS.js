'use strict';

// part 1
function changeColor() {
    document.body.style.backgroundColor = document.getElementById('inputColor').value;
}

// part 2
function changeFromSelect() {
    document.body.style.backgroundColor = document.querySelector('.mySelect').value;
}
// part 3
function changeWithClass() {
    document.body.className = document.querySelector('.mySelect2').value;
}
// part 4
function changeWithInputColor() {
    let color = document.getElementById('takeFromTypeColor').value;
    document.body.style.setProperty('--mycolor', color)
}
// part 5
function dontKnowHowToCallYou(selectElement) {
    document.body.style.setProperty('--mycolor', selectElement.value)
}