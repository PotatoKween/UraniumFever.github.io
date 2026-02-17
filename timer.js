if (localStorage.getItem('timerRemaining') !== null && parseInt(localStorage.getItem('timerRemaining')) <= 0) {
    console.log("BOMB UNSTABLE... Resetting game data...");
    localStorage.clear();
}

let remaining = parseInt(localStorage.getItem('timerRemaining'));
let strikes = parseInt(localStorage.getItem('strikes')) || 0;


if (isNaN(remaining) || remaining <= 0) {
    remaining = 2 * 60; 
    strikes = 0;
    localStorage.setItem('strikes', 0);
    localStorage.setItem('timerRemaining', remaining);
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
        showEndScreen("BOOM", "#c95832");
        return;
    }

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    if (timeDisplay) timeDisplay.innerText = minutes + ":" + seconds;
}

function addStrike() {
    strikes++;
    localStorage.setItem('strikes', strikes);
    console.log("Strike recorded. Total strikes:", strikes);
    
    if (strikes >= 3) {
        clearInterval(timerInterval);
        showEndScreen("BOOM", "red");
    }
}

function checkWinCondition() {
    const math = localStorage.getItem('mathModuleSolved') === 'true';
    const morse = localStorage.getItem('morseModuleSolved') === 'true';

    if (math && morse) {
        clearInterval(timerInterval);
        showEndScreen("Yay, you disarmed it! But is it really over?", "#32a852");
    }
}

function showEndScreen(message, textColor) {
    if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);

    document.body.innerHTML = ""; 
    document.body.style.backgroundColor = "black";
    document.body.style.color = textColor;
    document.body.style.textAlign = "center";
    document.body.style.paddingTop = "15%";
    document.body.style.fontFamily = "'Orbitron', sans-serif";

    const h1 = document.createElement("h1");
    h1.innerText = message;
    h1.style.fontSize = message.length > 10 ? "45px" : "120px";
    document.body.appendChild(h1);

    const btn = document.createElement("button");
    btn.innerText = "RETURN TO MAIN MENU";
    btn.style.marginTop = "50px";
    btn.style.padding = "20px 40px";
    btn.style.fontSize = "22px";
    btn.style.backgroundColor = textColor;
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "10px";
    
    btn.onclick = function() {
        localStorage.clear(); 
        window.location.href = "index.html"; 
    };
    document.body.appendChild(btn);
}

const timerInterval = setInterval(updateTimer, 1000);
window.addEventListener('load', checkWinCondition);

