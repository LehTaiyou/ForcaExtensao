const wordsWithHints = {
    "mouse": "Dispositivo de entrada usado para clicar",
    "keyboard": "Dispositivo de entrada usado para digitar",
    "monitor": "Dispositivo de saída que exibe imagens",
    "printer": "Dispositivo que imprime documentos",
    "router": "Dispositivo que encaminha dados na rede",
    "browser": "Programa usado para navegar na internet",
    "email": "Forma de comunicação eletrônica",
    "password": "Código secreto usado para segurança",
    "website": "Conjunto de páginas na internet",
    "internet": "Rede global de computadores"
};

const words = Object.keys(wordsWithHints);
let chosenWord = words[Math.floor(Math.random() * words.length)];
let displayWord = Array(chosenWord.length).fill("_");
let mistakes = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("wordDisplay").textContent = displayWord.join(" ");
    document.getElementById("hint").textContent = wordsWithHints[chosenWord];

    function createButtons() {
        const lettersDiv = document.getElementById("letters");
        for (let i = 97; i <= 122; i++) {
            let letter = String.fromCharCode(i);
            let btn = document.createElement("button");
            btn.textContent = letter;
            btn.onclick = () => guessLetter(letter, btn);
            lettersDiv.appendChild(btn);
        }
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
            showWinMessage();
        }
    }

    function showWinMessage() {
        const winMessage = document.createElement("div");
        winMessage.className = "win-message";
        winMessage.textContent = "Congratulations! You won!";
        document.body.appendChild(winMessage);
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    function showLoseMessage() {
        const loseMessage = document.createElement("div");
        loseMessage.className = "lose-message";
        loseMessage.textContent = "Game over! The word was " + chosenWord;
        document.body.appendChild(loseMessage);
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    createButtons();
});