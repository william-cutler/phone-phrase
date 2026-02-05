
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

document.getElementById("wordToDigitBtn").addEventListener("click", function () {
    const text = document.getElementById("wordInputArea").value;

    const cleanedWords = processWords(text);
    if (!cleanedWords.valid) {
        document.getElementById("wordToDigitOutput").textContent = "Invalid input, must be words separated by spaces, no special characters.";
    } else {
        const conversionResult = wordsToDigits(cleanedWords.words)
        document.getElementById("wordToDigitOutput").textContent = conversionResult;
    }
});

function formatWordOutput(wordOutputArr) {
    return wordOutputArr.join(".")
}

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
    const wordArray = lower.split(" ").filter(char => char !== "");

    if (hasInvalidCharacters || wordArray.length == 0) {
        return {valid: false, words: []};
    } else {
        console.log(wordArray)
        return {valid:true, words:wordArray};
    }
}

function wordsToDigits(cleanedWords){
    // Read in the file to get word array
    // Determine index of each word in array (or throw error if not present)
    const wordPositions = cleanedWords.map(item => WORD_ARRAY.indexOf(item));
    console.log(wordPositions)
    if (wordPositions.some(i => i < 0)) {
        throw new Error('Words not present in corpus. Check spelling?')
    }
    return toBaseTen(WORD_ARRAY.length, wordPositions)
}

function digitsToWords(digits){
    const wordPositions = toBaseN(digits, WORD_ARRAY.length);
    return wordPositions.map(i => WORD_ARRAY[i])
}

function toBaseTen(originBase, originDigits) {
    exponents = Array.from({ length: originDigits.length}, (_, i) => originBase ** i);
    return originDigits.reduce((currentTotal, nextDigit, index) => currentTotal + nextDigit * exponents[index])
}

function toBaseN(originalNumber, targetBase) {
    const resultDigits = []
    if (targetBase <= 1) throw new Error("Target base must be >= 2")
    if (originalNumber == 0) return [0];
    let remainingNumber = originalNumber;
    while (remainingNumber > 0) {
        const nextDigit = remainingNumber % targetBase;
        resultDigits.push(nextDigit);
        remainingNumber = Math.floor(remainingNumber / targetBase)
    }
    return resultDigits;
}
