const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || board[cell.dataset.index] !== "") return;

        board[cell.dataset.index] = currentPlayer;
        cell.textContent = currentPlayer;

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
    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a draw!";
    }
}

restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning");
    });
});
