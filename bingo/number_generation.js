const BINGO_MAX_VALUE_DEFAULT = 90;
const CURRENT_NUMBER_ID = "current-number";
const NEW_NUMBER_BUTTON_ID = "new-number-button";
const RECENT_NUMBERS_ID = "recent-numbers";
const CALLED_NUMBERS_ID = "called-numbers";

let called_numbers = [];
let recent_numbers = [];

function generateBingoNumber(maxBingoNumber) {
    let randomNumber = -2;

    if (maxBingoNumber != null) {
        randomNumber = Math.floor(Math.random() * maxBingoNumber);
    } else {
        randomNumber = Math.floor(Math.random() * BINGO_MAX_VALUE_DEFAULT);
    }

    return randomNumber + 1;
}

function drawNumber(maxBingoNumber) {
    if (maxBingoNumber == null || called_numbers.length == maxBingoNumber) {
        return -1;
    }

    let number = generateBingoNumber(maxBingoNumber);
    if (number == -1) {
        console.log("Something has gone wrong drawing numbers");
        return number;
    }

    let conflict = true;
    while (conflict == true) {

        if (called_numbers.includes(number)) {
            console.log("There was a conflict");
            number = generateBingoNumber();
        }
        else {
            conflict = false
        }
    }

    called_numbers.push(number);
    called_numbers.sort((a, b) => a - b);

    recent_numbers.push(number);
    if (recent_numbers.length > 5) {
        recent_numbers.shift();
    }

    return number;
}

function populateBingoNumber(number, currentNumberId) {

    let currentNumberDisplay = document.getElementById(currentNumberId);
    if (currentNumberDisplay != null) {
        currentNumberDisplay.innerText = number;
    }
    else {
        console.log("Cannot find ID to display number");
    }
}

function displayGameOver(currentNumberId) {
    let currentNumberDisplay = document.getElementById(currentNumberId);
    if (currentNumberDisplay != null) {
        currentNumberDisplay.innerText = "All Numbers Pulled: Game over!";
    }
    else {
        console.log("Cannot find ID to display number");
    }
}

function displayCalledNumbers(calledNumbersId, called_numbers) {
    let calledNumbersDisplay = document.getElementById(calledNumbersId);
    if (calledNumbersDisplay) {
        calledNumbersDisplay.innerText = called_numbers.join(", ");
    }
    else {
        console.log("Cannot find ID to display called numbers");
    }
}

function displayRecentNumbers(recentNumbersId, recent_numbers) {
    let recentNumbersDisplay = document.getElementById(recentNumbersId);
    if (recentNumbersDisplay != null) {
        recentNumbersDisplay.innerText = recent_numbers.join(", ");
    }
    else {
        console.log("Cannot find ID to display recently called numbers");
    }
}

function showBingoNumber() {

    let number = drawNumber(BINGO_MAX_VALUE_DEFAULT);
    if (number != -1) {
        populateBingoNumber(number, CURRENT_NUMBER_ID);
    } else {
        displayGameOver(CURRENT_NUMBER_ID);
    }

    displayCalledNumbers(CALLED_NUMBERS_ID, called_numbers);
    displayRecentNumbers(RECENT_NUMBERS_ID, recent_numbers);


}

let button = document.getElementById(NEW_NUMBER_BUTTON_ID);
if (button != null) {
    button.onclick = showBingoNumber;
}
else {
    console.log("Cannot find ID to active button");
}
