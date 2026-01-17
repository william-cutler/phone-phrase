const digitToWordBtn = document.getElementById("digitToWordBtn");
const digitInputArea = document.getElementById("digitInputArea");
const digitToWordOutput = document.getElementById("digitToWordOutput");

digitToWordBtn.addEventListener("click", function () {
    const text = digitInputArea.value;
    const digitsOnly = text.replace(/\D/g, "");
    if (digitsOnly.length == 0) {
        digitToWordOutput.textContent = "Need at least one digit";
    } else {
        digitToWordOutput.textContent = digitsToWords(digitsOnly);
    }
});

const wordToDigitBtn = document.getElementById("wordToDigitBtn");
const wordInputArea = document.getElementById("wordInputArea");
const wordToDigitOutput = document.getElementById("wordToDigitOutput");

wordToDigitBtn.addEventListener("click", function () {
    const text = wordInputArea.value;

    cleanedWords = processWords(text);
    if (!cleanedWords.valid) {
        wordToDigitOutput.textContent = "Invalid input, must be words separated by spaces, no special characters.";
    } else {
        conversionResult = wordsToDigits(cleanedWords.words)
        wordToDigitOutput.textContent = conversionResult;
    }
});

/**
 * Processes a string of words by converting to lowercase, validating characters,
 * and splitting into an array of words.
 *
 * Only lowercase/uppercase letters and spaces are allowed. If the input contains
 * any other characters, the function returns `valid: false` and an empty array.
 *
 * @param {string} wordInput - The input string containing words.
 * @returns {{valid: boolean, words: string[]}} An object with:
 *   - `valid`: true if the input contains only letters and spaces, false otherwise
 *   - `words`: array of words split by spaces if valid, otherwise an empty array
 */
function processWords(wordInput){
    const lower = wordInput.toLowerCase();

    const hasInvalidCharacters = /[^a-z ]/.test(lower);
    wordArray = lower.split(" ").filter(char => char !== "");

    if (hasInvalidCharacters || wordArray.length == 0) {
        return {valid: false, words: []};
    } else {
        console.log(wordArray)
        return {valid:true, words:wordArray};
    }
}

function wordsToDigits(cleanedWords){
    return cleanedWords.length
}

function digitsToWords(digits){
    return digits;
}
