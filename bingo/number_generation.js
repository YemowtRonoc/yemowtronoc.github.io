const BINGO_MAX_VALUE_DEFAULT = 90;
const CURRENT_NUMBER_ID = "current-number";
const NEW_NUMBER_BUTTON_ID = "new-number-button";
const RECENT_NUMBERS_ID = "recent-numbers";
const CALLED_NUMBERS_ID = "called-numbers";
const RESET_GAME_BUTTON_ID = "reset-game-button";

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

function displayNumberList(elementId, numberList) {
    let numberDisplay = document.getElementById(elementId);
    if (numberDisplay) {
        numberDisplay.innerText = numberList.join(", ");
    }
    else {
        console.log("Cannot find ID to display list of numbers");
    }

}

function showBingoNumber() {

    let number = drawNumber(BINGO_MAX_VALUE_DEFAULT);
    if (number != -1) {
        populateBingoNumber(number, CURRENT_NUMBER_ID);
    } else {
        displayGameOver(CURRENT_NUMBER_ID);
    }

    displayNumberList(CALLED_NUMBERS_ID, called_numbers);
    displayNumberList(RECENT_NUMBERS_ID, recent_numbers);


}

function displayStartGame(currentNumberId) {
    let currentNumberDisplay = document.getElementById(currentNumberId);
    if (currentNumberDisplay != null) {
        currentNumberDisplay.innerText = "Game Ready to Start";
    }
    else {
        console.log("Cannot find ID to display number");
    }

}

function resetGame() {
    called_numbers = [];
    displayNumberList(CALLED_NUMBERS_ID, called_numbers);

    recent_numbers = []
    displayNumberList(RECENT_NUMBERS_ID, recent_numbers);

    displayStartGame(CURRENT_NUMBER_ID);
}

let generateNumberButton = document.getElementById(NEW_NUMBER_BUTTON_ID);
if (generateNumberButton != null) {
    generateNumberButton.onclick = showBingoNumber;
}
else {
    console.log("Cannot find ID to active button");
}

let resetButton = document.getElementById(RESET_GAME_BUTTON_ID);
if (resetButton != null) {
    resetButton.onclick = resetGame;
}
else {
    console.log("Cannot find ID to active button");
}
