const numRandomEvents = 5;





const timerDisplay = document.querySelector(".time");
const startBtn = document.querySelector("#start");
const focusBtn = document.querySelector(".focus");
const breakBtn = document.querySelector(".break");
const btns = document.querySelectorAll(".btn");
const configFocusBtn = document.querySelector(".config-focus");
const configBreakBtn = document.querySelector(".config-break");

btns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "rgb(241, 241, 241)";
    })

    btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "";
    })

    btn.addEventListener("mousedown", () => {
        btn.style.cssText = "border: solid black 4px; background-color: rgb(241, 241, 241);";
    })

    btn.addEventListener("mouseup", () => {
        btn.style.cssText = "border: ;background-color: rgb(241, 241, 241);";
    })

});

// timer code

let timer;
let focusTime = 25;
let breakTime = 5;
let minutes = focusTime;
let seconds = 0;
let isPaused = true;
let isFocus = true;
let isBreak = false;

let startTime = function() {
    timer = setInterval(updateTime, 1000);
}

let updateTime = function() {
    timerDisplay.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        if (isFocus) {
        alert("Time's up! You deserve a break :)");
        breakResetTime();

        } else {
            alert("Time to focus!");
            focusResetTime();
        }
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            seconds--;
            minutes--;
        }
    }
}

let formatTime = function(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let toggleStartPause = function() {
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer);
        startBtn.textContent = "Start";
    } else {
        startTime();
        startBtn.textContent = "Pause";
    }
}

let focusResetTime = function() {
    clearInterval(timer);
    isFocus = true;
    isBreak = false;
    minutes = focusTime;
    seconds = 0;
    isPaused = true;
    timerDisplay.textContent = formatTime(minutes, seconds);
    startBtn.textContent = "Start"
}

let breakResetTime = function() {
    clearInterval(timer);
    isFocus = false;
    isBreak = true;
    minutes = breakTime;
    seconds = 0;
    isPaused = true;
    timerDisplay.textContent = formatTime(minutes, seconds);
    startBtn.textContent = "Start"
}

let chooseFocusTime = function() {
    const newFocusTime = prompt("Enter new focus time in minutes: ");
    if (!isNaN(newFocusTime) && newFocusTime > 0) {
        enteredtime = parseInt(newFocusTime);
        focusTime = newFocusTime;
        
        if (isFocus) {
            minutes = focusTime;
            seconds = 0;
            timerDisplay.textContent = formatTime(minutes, seconds);
        }
    } else {
        alert('Invalid input. Please enter a valid number greater than 0');
    }
}

let chooseBreakTime = function() {
    const newBreakTime = prompt("Enter new break time in minutes: ");
    if (!isNaN(newBreakTime) && newBreakTime > 0) {
        enteredtime = parseInt(newBreakTime);
        breakTime = newBreakTime;
        
        if (isBreak) {
            minutes = breakTime;
            seconds = 0;
            timerDisplay.textContent = formatTime(minutes, seconds);
        }
    } else {
        alert('Invalid input. Please enter a valid number greater than 0');
    }
}

startBtn.addEventListener("click", () => {
    toggleStartPause();
});

focusBtn.addEventListener("click", () => {
    focusResetTime();
});

breakBtn.addEventListener("click", () => {
    breakResetTime();
});

configFocusBtn.addEventListener("click", () => {
    chooseFocusTime();
});

configBreakBtn.addEventListener("click", () => {
    chooseBreakTime();
});