const TOTAL_TIME = 5 * 60;

let startTime = localStorage.getItem('timerStart');

if (!startTime || Date.now() - parseInt(startTime) > TOTAL_TIME * 1000) {
    startTime = Date.now();
    localStorage.setItem('timerStart', startTime);
} else {
    startTime = parseInt(startTime);
}

const time = document.getElementById('timer');

function updateTimer() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    let remaining = TOTAL_TIME - elapsed;

    if (remaining <= 0) {
        remaining = 0;
        time.innerText = "00:00";
        clearInterval(timerInterval);
        alert("BOOM");
        return;
    }

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    time.innerText = `${minutes}:${seconds}`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
