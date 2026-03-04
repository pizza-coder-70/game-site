const WORD_LIST = [
    "RELOAD", "DANGER", "Bunker", "VALLEY", "CACTUS", "ENERGY", "RAIDER", "LEGION",
    "NCRIVE", "KIMBALL", "CAESAR", "HOOVER", "DAMMED", "THREAT", "BATTLE", "CHANCE",
    "GHOULS", "MASTER", "FALLOUT", "VEGASX", "LUCKYL", "BOSCON", "STRIPZ", "PRIMMZ"
];

let targetWord = "";
let attempts = 4;
let memoryContent = "";

const attemptsEl = document.getElementById('attempts');
const blocksEl = document.querySelector('.attempt-blocks');
const memoryDumpEl = document.getElementById('memoryDump');
const logEl = document.getElementById('log');
const currentSelectionEl = document.getElementById('currentSelection');
const gameOverEl = document.getElementById('gameOver');
const statusTitleEl = document.getElementById('statusTitle');
const statusDescEl = document.getElementById('statusDesc');

function initGame() {
    targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
    console.log("Target:", targetWord); // Debug

    const selectedWords = [targetWord];
    while (selectedWords.length < 12) {
        const word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
        if (!selectedWords.includes(word)) selectedWords.push(word);
    }

    // Shuffle words so target isn't always first
    selectedWords.sort(() => Math.random() - 0.5);

    // Mix in random junk characters
    const junk = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
    let output = "";

    selectedWords.forEach(word => {
        // Add some junk before the word
        for (let i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
            output += `<span>${junk[Math.floor(Math.random() * junk.length)]}</span>`;
        }
        // Add the word
        for (let char of word) {
            output += `<span class="word-char" data-word="${word}">${char}</span>`;
        }
    });

    // Fill the rest with junk
    while (output.split('</span>').length < 400) {
        output += `<span>${junk[Math.floor(Math.random() * junk.length)]}</span>`;
    }

    memoryDumpEl.innerHTML = output;

    // Event Listeners for word segments
    document.querySelectorAll('.word-char').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const word = el.dataset.word;
            highlightWord(word, true);
            currentSelectionEl.textContent = word;
        });

        el.addEventListener('mouseleave', () => {
            const word = el.dataset.word;
            highlightWord(word, false);
            currentSelectionEl.textContent = "";
        });

        el.addEventListener('click', () => {
            const word = el.dataset.word;
            checkWord(word);
        });
    });
}

function highlightWord(word, shouldHighlight) {
    document.querySelectorAll(`.word-char[data-word="${word}"]`).forEach(charEl => {
        if (shouldHighlight) {
            charEl.style.backgroundColor = 'var(--terminal-green)';
            charEl.style.color = 'var(--terminal-bg)';
        } else {
            charEl.style.backgroundColor = 'transparent';
            charEl.style.color = 'var(--terminal-green)';
        }
    });
}

function checkWord(word) {
    if (word === targetWord) {
        victory();
    } else {
        attempts--;
        const likeness = calculateLikeness(word, targetWord);
        addLog(`> ${word}`);
        addLog(`> ENTRY DENIED.`);
        addLog(`> LIKENESS=${likeness}`);
        updateAttempts();

        if (attempts <= 0) {
            failure();
        }
    }
}

function calculateLikeness(word1, word2) {
    let likeness = 0;
    for (let i = 0; i < Math.min(word1.length, word2.length); i++) {
        if (word1[i] === word2[i]) likeness++;
    }
    return likeness;
}

function addLog(msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    logEl.appendChild(p);
    if (logEl.children.length > 8) logEl.removeChild(logEl.firstChild);
}

function updateAttempts() {
    attemptsEl.textContent = attempts;
    let blocks = "";
    for (let i = 0; i < attempts; i++) blocks += "■ ";
    blocksEl.textContent = blocks;
}

function victory() {
    statusTitleEl.textContent = "ACCESS GRANTED";
    statusDescEl.textContent = "WELCOME TO ROBCO INDUSTRIES";
    gameOverEl.style.display = "flex";
}

function failure() {
    statusTitleEl.textContent = "TERMINAL LOCKED";
    statusDescEl.textContent = "SECURITY BREACH DETECTED";
    gameOverEl.style.display = "flex";
}

initGame();
