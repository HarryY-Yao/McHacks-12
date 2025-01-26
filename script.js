const numRandomEvents = 6;


// get's a random integer between 1 and the number of random events
let getRandomInt = function () {
    return Math.floor(Math.random() * (numRandomEvents) + 1);
}

let randomEventNumber = getRandomInt();

const startRedirect = document.querySelector(".start-redirect");
const addRedirect = document.querySelector(".add-redirect");
const timerDisplay = document.querySelector(".time");
const startBtn = document.querySelector("#start");
const focusBtn = document.querySelector(".focus");
const breakBtn = document.querySelector(".break");
const btns = document.querySelectorAll(".btn");
const configFocusBtn = document.querySelector(".config-focus");
const configBreakBtn = document.querySelector(".config-break");
const addBtn = document.querySelector(".add");

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
    if (randomEventNumber == 1 && isPaused) {
        toggleStartPause();
    } else if (!isPaused) {
        toggleStartPause();
    } else {
        startRedirect.removeAttribute("href");
        randomEventNumber = getRandomInt();
        chooseRedirect();
        if (randomEventNumber == 1 && isPaused) {
            toggleStartPause();
        }
        console.log(randomEventNumber);
    }
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

// Tasks code


addBtn.addEventListener("click", () =>{
    if (randomEventNumber == 1) {
        createTask();
    } else {
        addRedirect.removeAttribute("href");
        randomEventNumber = getRandomInt();
        chooseRedirect();
    }
});

function createTask(){
    const taskManager = document.querySelector(".tasks ul");

    const newTask = document.createElement("li");
    newTask.classList.add("text-item");

    const taskTextarea = document.createElement("textarea");
    taskTextarea.placeholder = "Enter task";
    taskTextarea.classList.add("task-text");

    const timeContainer = document.createElement("div");
    timeContainer.classList.add("time-container");

    const hoursSelect = document.createElement("select");
    hoursSelect.classList.add("hours-select");
    for (let i = 0; i <= 23; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        hoursSelect.appendChild(option);
    }

    const colonSeparator = document.createElement("span");
    colonSeparator.textContent = ":";
    colonSeparator.classList.add("colon-separator");

    const minutesSelect = document.createElement("select");
    minutesSelect.classList.add("minutes-select");
    for (let i = 0; i <= 59; i+=5) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i < 10 ? `0${i}` : i;
        minutesSelect.appendChild(option);
    }

    timeContainer.appendChild(hoursSelect);
    timeContainer.appendChild(colonSeparator);
    timeContainer.appendChild(minutesSelect);
    
    const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        checkButton.classList.add("check-button");
        checkButton.style.backgroundColor = "green";
    
        checkButton.addEventListener("click", () => {
            const taskName = taskTextarea.value.trim(); // Trim to avoid empty spaces
            const hours = hoursSelect.value || "0"; // Default "0" if no selection
            const minutes = minutesSelect.value || "00"; // Default "00"
    
            if (!taskName) {
                alert("Task name cannot be empty!");
                return;
            }
    
            const formattedTime = `${hours}:${minutes.padStart(2, "0")}`;
            newTask.textContent = `${taskName} - ${formattedTime}`;
    
            newTask.classList.remove("text-item");
            newTask.classList.remove("task-text");
            newTask.classList.add("task-item");
            newTask.classList.add("task-text2");
    
            const closeButton = document.createElement("button");
            closeButton.classList.add("close-button");
            closeButton.textContent = "X";
    
            closeButton.addEventListener("click", () => {
                newTask.remove();
            })
    
            newTask.appendChild(closeButton);
        });
    
        newTask.appendChild(taskTextarea);
        newTask.appendChild(timeContainer);
        newTask.appendChild(checkButton);
    
        taskManager.insertBefore(newTask, taskManager.firstChild);
}



// Productivity breaker

const toWordle = function() {
    startRedirect.setAttribute("href", "https://www.nytimes.com/games/wordle/index.html");
    addRedirect.setAttribute("href", "https://www.nytimes.com/games/wordle/index.html");
}

const toInstagram = function() {
    startRedirect.setAttribute("href","https://www.instagram.com/");
    addRedirect.setAttribute("href","https://www.instagram.com/");
    
}

const toSnake = function() {
    startRedirect.setAttribute("href", "snake-game.html");
    addRedirect.setAttribute("href", "snake-game.html");
}

const toPong = function() {
    startRedirect.setAttribute("href", "pong.html");
    addRedirect.setAttribute("href", "pong.html");
}

const toYoutube = function() {
    startRedirect.setAttribute("href", "https://www.youtube.com/");
    addRedirect.setAttribute("href", "https://www.youtube.com/");
}

const chooseRedirect = function() {
    if (randomEventNumber == 2) {
        toWordle();
    } else if (randomEventNumber == 3) {
        toInstagram();
    } else if (randomEventNumber == 4) {
        toSnake();
    } else if (randomEventNumber == 5) {
        toPong();
    } else if (randomEventNumber == 6) {
        toYoutube();
    }
}

console.log(randomEventNumber);