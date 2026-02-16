const PILOT_RANK = 4;
let correctAnswer = "";

function generateModule() {
    let d1 = localStorage.getItem('math_d1');
    let d2 = localStorage.getItem('math_d2');
    let d3 = localStorage.getItem('math_d3');
    let d4 = localStorage.getItem('math_d4');

    if (d1 === null) {
        d1 = Math.floor(Math.random() * 10);
        d2 = Math.floor(Math.random() * 10);
        d3 = Math.floor(Math.random() * 10);
        d4 = Math.floor(Math.random() * 10);

        localStorage.setItem('math_d1', d1);
        localStorage.setItem('math_d2', d2);
        localStorage.setItem('math_d3', d3);
        localStorage.setItem('math_d4', d4);
    } else {
        d1 = parseInt(d1);
        d2 = parseInt(d2);
        d3 = parseInt(d3);
        d4 = parseInt(d4);
    }

    const displayElement = document.getElementById('display-screen');
    if (displayElement) {
        displayElement.innerText = `${d1}${d2}${d3}${d4}`;
    }

    // --- RULES ---
    let result = (d1 * PILOT_RANK) + d2;
    result = result - d4;
    if (result < 10) result += 14;
    
    let finalValue = result * d3;
    let finalStr = finalValue.toString();
    correctAnswer = finalStr.slice(-4).padStart(4, "0");
}

function checkAnswer() {
    const inputField = document.getElementById('user-input');
    const userInput = inputField.value;

    if (userInput === correctAnswer) {
        localStorage.setItem('mathModuleSolved', 'true'); //

        alert("✔️ MATH MODULE STABILIZED.");
        inputField.disabled = true;
        inputField.style.cursor = "not-allowed";
        
        const display = document.getElementById('display-screen');
        display.innerText = "SAFE";
        display.style.color = "#00FF00";

        if (typeof checkWinCondition === "function") {
            checkWinCondition();
        }
    } else {
        alert("❌ STRIKE!");
        inputField.value = ""; 
        if (typeof addStrike === "function") {
            addStrike();
        }
    }
}

window.onload = function() {
    const isSolved = localStorage.getItem('mathModuleSolved'); //

    if (isSolved === 'true') {
        const display = document.getElementById('display-screen');
        const input = document.getElementById('user-input');
        display.innerText = "SAFE";
        display.style.color = "#00FF00";
        input.disabled = true;
        input.placeholder = "DONE";
    } else {
        generateModule();
    }
};
