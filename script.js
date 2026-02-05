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

    cleanedWords = processWords(text);
    if (!cleanedWords.valid) {
        document.getElementById("wordToDigitOutput").textContent = "Invalid input, must be words separated by spaces, no special characters.";
    } else {
        conversionResult = wordsToDigits(cleanedWords.words)
        document.getElementById("wordToDigitOutput").textContent = conversionResult;
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
    // Fetch the file (assuming it's in the same folder as index.html)
    fetch('test_words.txt')
        .then(response => {
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error('File not found or error fetching');
            }
            return response.text(); // Get the content of the file as text
        })
        .then(text => {
            // Split the file content by newline and remove leading/trailing spaces
            const wordsArray = text.split('\n').map(word => word.trim());

            // Display the array of words in the <pre> element
            digitToWordOutput.textContent = JSON.stringify(wordsArray, null, 2);
        })
        .catch(error => {
            // Handle any errors (e.g., file not found, network error)
            console.error('Error:', error);
            document.getElementById('output').textContent = `Error: ${error.message}`;
        });
    return digits;
}
