let remaining = parseInt(localStorage.getItem('timerRemaining'));
let strikes = parseInt(localStorage.getItem('strikes')) || 0;

if (isNaN(remaining) || remaining <= 0) {
    remaining = 5 * 60;
    strikes = 0;        
    localStorage.setItem('strikes', 0);
}

const timeDisplay = document.getElementById('timer');

function updateTimer() {
    let penalty = 1;
    if (strikes === 1) penalty = 2;
    if (strikes >= 2) penalty = 3;

    remaining -= penalty;

    localStorage.setItem('timerRemaining', remaining);

    if (remaining <= 0) {
        remaining = 0;
        clearInterval(timerInterval);
        timeDisplay.innerText = "00:00";
        
        localStorage.clear(); 
        alert("BOOM!");
        return;
    }

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    timeDisplay.innerText = `${minutes}:${seconds}`;
}

const timerInterval = setInterval(updateTimer, 1000);

const minutesStart = String(Math.floor(remaining / 60)).padStart(2, '0');
const secondsStart = String(remaining % 60).padStart(2, '0');
timeDisplay.innerText = `${minutesStart}:${secondsStart}`;

function addStrike() {
    strikes++;
    localStorage.setItem('strikes', strikes);
    
    if (strikes >= 3) {
        alert("GAME OVER: 3 STRIKES");
        localStorage.clear();
        location.reload();
    }
}