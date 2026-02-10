const inputArea = document.getElementById("inputArea");
const convertBtn = document.getElementById("convertBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

convertBtn.addEventListener("click", startConversion);

inputArea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent adding a newline in a textarea
        startConversion();
    }
});

copyBtn.addEventListener("click", () => {
    const textToCopy = output.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Copied to clipboard!");
            copyBtn.textContent = "Copied!";
            setTimeout(() => copyBtn.textContent = "Copy", 1000);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
});

function startConversion() {
    const text = inputArea.value;
    const parseResult = parseInput(text);
    switch (parseResult.type) {
        case InputType.INVALID:
            output.textContent = "I only work on digits or words separately :/";
            break;
        case InputType.DIGITS:
            output.textContent = formatWordOutput(digitsToWords(Number(parseResult.value)));
            break;
        case InputType.WORDS:
            output.textContent = wordsToDigits(parseResult.value);
            break;
    }
}

const InputType = {
    DIGITS: "DIGITS",
    WORDS: "WORDS",
    INVALID: "INVALID",
};

function parseInput(input) {
    if (typeof input !== "string") {
        return { type: InputType.INVALID, value: null };
    }

    // Case 1: only digits and punctuation
    // Punctuation = anything that's not a letter, digit, or space
    if (/^[\d\p{P}]+$/u.test(input)) {
        const digitsOnly = input.replace(/\D+/g, "");
        if (digitsOnly.length === 0) {
            return { type: InputType.INVALID, value: null };
        }
        return {
            type: InputType.DIGITS,
            value: digitsOnly,
        };
    }

    // Case 2: only letters, spaces, periods, or commas
    if (/^[a-zA-Z\s.,]+$/.test(input)) {
        const words = input
            .toLowerCase()
            .split(/[.,\s]+/)
            .filter(Boolean);

        return {
            type: InputType.WORDS,
            value: words,
        };
    }

    // Case 3: anything else
    return {
        type: InputType.INVALID,
        value: null,
    };
}

function formatWordOutput(wordOutputArr) {
    return wordOutputArr.join(".")
}

function wordsToDigits(cleanedWords) {
    // Determine index of each word in array (or throw error if not present)
    const wordPositions = cleanedWords.map(item => WORD_ARRAY.indexOf(item));
    console.log(wordPositions)
    if (wordPositions.some(i => i < 0)) {
        throw new Error('Words not present in corpus. Check spelling?')
    }
    return toBaseTen(WORD_ARRAY.length, wordPositions)
}

function digitsToWords(digits) {
    const wordPositions = toBaseN(digits, WORD_ARRAY.length);
    return wordPositions.map(i => WORD_ARRAY[i])
}

function toBaseTen(originBase, originDigits) {
    exponents = Array.from({ length: originDigits.length }, (_, i) => originBase ** i);
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

// digitToWordBtn.addEventListener("click", function () {
//     const text = digitInputArea.value;
//     const digitsOnly = text.replace(/\D/g, "");
//     if (digitsOnly.length == 0) {
//         digitToWordOutput.textContent = "Need at least one digit";
//     } else {
//         digitToWordOutput.textContent = digitsToWords(digitsOnly);
//     }
// });

// document.getElementById("wordToDigitBtn").addEventListener("click", function () {
//     const text = document.getElementById("wordInputArea").value;

//     const cleanedWords = processWords(text);
//     if (!cleanedWords.valid) {
//         document.getElementById("wordToDigitOutput").textContent = "Invalid input, must be words separated by spaces, no special characters.";
//     } else {
//         const conversionResult = wordsToDigits(cleanedWords.words)
//         document.getElementById("wordToDigitOutput").textContent = conversionResult;
//     }
// });

// /**
//  * Processes a string of words by converting to lowercase, validating characters,
//  * and splitting into an array of words.
//  *
//  * Only lowercase/uppercase letters and spaces are allowed. If the input contains
//  * any other characters, the function returns `valid: false` and an empty array.
//  *
//  * @param {string} wordInput - The input string containing words.
//  * @returns {{valid: boolean, words: string[]}} An object with:
//  *   - `valid`: true if the input contains only letters and spaces, false otherwise
//  *   - `words`: array of words split by spaces if valid, otherwise an empty array
//  */
// function processWords(wordInput) {
//     const lower = wordInput.toLowerCase();

//     const hasInvalidCharacters = /[^a-z ]/.test(lower);
//     const wordArray = lower.split(" ").filter(char => char !== "");

//     if (hasInvalidCharacters || wordArray.length == 0) {
//         return { valid: false, words: [] };
//     } else {
//         console.log(wordArray)
//         return { valid: true, words: wordArray };
//     }
// }