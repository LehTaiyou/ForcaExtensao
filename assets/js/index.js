const wordsWithHints = {
    "agile": "Metodologia de desenvolvimento de software que promove entregas rápidas e iterativas",
    "algorithm": "Conjunto de instruções para resolver um problema",
    "debugging": "Processo de encontrar e corrigir erros",
    "refactoring": "Melhoria do código sem alterar seu comportamento",
    "repository": "Local onde o código é armazenado",
    "sprint": "Período de trabalho em metodologias ágeis",
    "unit": "Teste de uma unidade individual de código",
    "integration": "Teste de múltiplas unidades de código juntas",
    "system": "Teste do sistema como um todo",
    "performance": "Teste para verificar a velocidade e eficiência",
    "usability": "Teste para avaliar a facilidade de uso",
    "black box": "Teste focado nas funcionalidades sem conhecer o código interno",
    "static analysis": "Análise do código sem executá-lo",
    "white box": "Teste baseado no conhecimento detalhado do código interno",
    "debug": "Processo de identificar e remover erros do código",
    "smoke": "Teste inicial para verificar se as funções básicas estão funcionando",
    "exploratory": "Teste onde os casos de teste não são definidos com antecedência",
    "stress": "Teste para determinar os limites de um sistema sob condições extremas",
    "code review": "Revisão do código por outros desenvolvedores para encontrar erros e melhorar a qualidade",
    "API": "Interface para comunicação entre diferentes sistemas de software"
};

const words = [
    "agile",
    "algorithm",
    "debugging",
    "refactoring",
    "repository",
    "sprint",
    "unit",
    "integration",
    "system",
    "performance",
    "usability",
    "black-box",
    "static",
    "white-box",
    "debug",
    "smoke",
    "exploratory",
    "stress",
    "code-review",
    "API"
];

let currentWordIndex = 0;
let chosenWord = words[currentWordIndex].toLowerCase();
let displayWord = Array(chosenWord.length).fill("_");
let mistakes = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startButton").addEventListener("click", startGame);

    function startGame() {
        currentWordIndex = 0;
        chosenWord = words[currentWordIndex].toLowerCase();
        displayWord = Array(chosenWord.length).fill("_");
        mistakes = 0;
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("wordDisplay").textContent = displayWord.join(" ");
        document.getElementById("hint").textContent = wordsWithHints[chosenWord.replace("-", " ")];
        createButtons();
    }

    function createButtons() {
        const lettersDiv = document.getElementById("letters");
        lettersDiv.innerHTML = ''; // Clear previous buttons
        for (let i = 97; i <= 122; i++) {
            let letter = String.fromCharCode(i);
            let btn = document.createElement("button");
            btn.textContent = letter;
            btn.onclick = () => guessLetter(letter, btn);
            lettersDiv.appendChild(btn);
        }
        // Add button for hyphen
        let hyphenBtn = document.createElement("button");
        hyphenBtn.textContent = "-";
        hyphenBtn.onclick = () => guessLetter("-", hyphenBtn);
        lettersDiv.appendChild(hyphenBtn);
    }

    function guessLetter(letter, btn) {
        btn.disabled = true;
        if (chosenWord.includes(letter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) displayWord[i] = letter;
            }
        } else {
            mistakes++;
            const hangmanImage = document.getElementById("hangman");
            hangmanImage.style.opacity = 0; // Reset opacity for animation
            switch (mistakes) {
                case 1:
                    hangmanImage.src = `../images/head.png`;
                    break;
                case 2:
                    hangmanImage.src = `../images/body.png`;
                    break;
                case 3:
                    hangmanImage.src = `../images/left_arm.png`;
                    break;
                case 4:
                    hangmanImage.src = `../images/right_arm.png`;
                    break;
                case 5:
                    hangmanImage.src = `../images/left_leg.png`;
                    break;
                case 6:
                    hangmanImage.src = `../images/right_leg.png`;
                    setTimeout(() => {
                        showLoseMessage();
                    }, 500); // Adiciona um pequeno atraso para garantir que a imagem seja atualizada
                    break;
            }
            hangmanImage.style.animation = 'none'; // Reset animation
            hangmanImage.offsetHeight; // Trigger reflow
            hangmanImage.style.animation = ''; // Restart animation
        }
        document.getElementById("wordDisplay").textContent = displayWord.join(" ");
        checkGameStatus();
    }

    function checkGameStatus() {
        if (!displayWord.includes("_")) {
            currentWordIndex++;
            if (currentWordIndex < words.length) {
                chosenWord = words[currentWordIndex].toLowerCase();
                displayWord = Array(chosenWord.length).fill("_");
                mistakes = 0;
                document.getElementById("wordDisplay").textContent = displayWord.join(" ");
                document.getElementById("hint").textContent = wordsWithHints[chosenWord.replace("-", " ")];
                createButtons();
            } else {
                showWinMessage();
            }
        }
    }

    function showWinMessage() {
        const congratulationsSound = document.getElementById("congratulationsSound");
        congratulationsSound.play();
        const winMessage = document.createElement("div");
        winMessage.className = "win-message";
        winMessage.textContent = "Congratulations! You won all the words!";
        document.body.appendChild(winMessage);
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    function showLoseMessage() {
        const gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play();
        const loseMessage = document.createElement("div");
        loseMessage.className = "lose-message";
        loseMessage.textContent = "Game over! The word was " + chosenWord.replace("-", " ");
        document.body.appendChild(loseMessage);
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});