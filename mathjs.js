const PILOT_RANK = 4;
let correctAnswer = "";

function generateModule() {
    const d1 = Math.floor(Math.random() * 10);
    const d2 = Math.floor(Math.random() * 10);
    const d3 = Math.floor(Math.random() * 10);
    const d4 = Math.floor(Math.random() * 10);

    const displayElement = document.getElementById('display-screen');
    if (displayElement) {
        displayElement.innerText = `${d1}${d2}${d3}${d4}`;
    }

    // Rule 1: Multiply 1st digit by Pilot Rank (4)
    // Rule 2: Add 2nd digit
    let result = (d1 * PILOT_RANK) + d2;

    // Rule 3: Subtract 4th digit
    result = result - d4;

    // Rule 4: If result < 10, add 14
    if (result < 10) {
        result += 14;
    }

    // Rule 5: Multiply by the 3rd digit
    let finalValue = result * d3;

    // Rule 6: last four digits (just add leading 0 if necessary)
    let finalStr = finalValue.toString();
    correctAnswer = finalStr.slice(-4).padStart(4, "0");
}

function checkAnswer() {
    const inputField = document.getElementById('user-input');
    const userInput = inputField.value;

    if (userInput === correctAnswer) {
        localStorage.setItem('mathModuleSolved', 'true');

        alert("✔️ MATH MODULE STABILIZED. Proceed to remaining modules.");
        
        inputField.disabled = true;
        inputField.style.cursor = "not-allowed";
        inputField.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        
        document.getElementById('display-screen').innerText = "SAFE";
        document.getElementById('display-screen').style.color = "#00FF00";

    } else {
        alert("❌ DISCREPANCY!");
        inputField.value = ""; 
        
        if (typeof addStrike === "function") {
            addStrike();
        }
    }
}

window.onload = function() {
    const isSolved = localStorage.getItem('mathModuleSolved');

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