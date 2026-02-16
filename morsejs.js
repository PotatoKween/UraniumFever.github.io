const word = "LIE";

function initMorse() {
    if (localStorage.getItem('morseModuleSolved') === 'true') {
        lockModule();
    }
}

function lockModule() {
    const display = document.getElementById('morse-display');
    const input = document.getElementById('user-input');
    
    if (display) {
        display.innerText = "SAFE";
        display.style.color = "#00FF00";
        display.style.textShadow = "0 0 15px #00FF00";
    }
    
    if (input) {
        input.value = word;
        input.disabled = true;
        input.style.cursor = "not-allowed";
    }
}

function checkMorseAnswer() {
    console.log("Submit button was clicked!");

    const inputField = document.getElementById('user-input');
    if (!inputField) return;

    const userInput = inputField.value.toUpperCase().trim();
    
    if (userInput === word) {
        alert("✔️ FREQUENCY STABILIZED");
        localStorage.setItem('morseModuleSolved', 'true');
        lockModule();
    } else {
        alert("❌ STRIKE! INTERFERENCE DETECTED");
        inputField.value = ""; 
        
        if (typeof addStrike === "function") {
            addStrike();
        }
    }
}

window.onload = initMorse;