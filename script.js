const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let playerMoves = { "X": [], "O": [] }; 

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.dataset.index;
        if (!gameActive || board[index] !== "") return;

        board[index] = currentPlayer;
        playerMoves[currentPlayer].push(index);
        cell.textContent = currentPlayer;
        cell.classList.add("filled");

        if (playerMoves[currentPlayer].length > 3) {
            let removedIndex = playerMoves[currentPlayer].shift();
            board[removedIndex] = "";
            cells[removedIndex].textContent = "";
        }

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `Player ${board[a]} wins!`;
            cells[a].classList.add("winning");
            cells[b].classList.add("winning");
            cells[c].classList.add("winning");
            return;
        }
    }
}

restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    playerMoves = { "X": [], "O": [] };
    statusText.textContent = "Player X's turn";
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning", "filled");
    });
});
