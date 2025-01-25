const timerDisplay = document.querySelector(".time");
const startBtn = document.querySelector(".start");

let timer;
let minutes = 25;
let seconds = 0;
let isPaused = false;

let startTime = function() {
    timer = setInterval(updateTimer, 1000);
}

let updateTime = function() {
    timerDisplay.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert("Time's up! You deserve a break :)")
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            seconds--;
        }
    }
} 