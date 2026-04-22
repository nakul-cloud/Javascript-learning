// ================================
// 1. GAMEBOARD (DATA)
// ================================
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMark = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const reset = () => {
    board.fill("");
  };

  return { getBoard, placeMark, reset };
})();


// ================================
// 2. PLAYER FACTORY
// ================================
function createPlayer(name, marker) {
  return { name, marker };
}


// ================================
// 3. GAME CONTROLLER (LOGIC)
// ================================
const GameController = (() => {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");

  let currentPlayer = player1;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const checkWinner = () => {
    const board = Gameboard.getBoard();

    return winningCombos.some(combo =>
      combo.every(index => board[index] === currentPlayer.marker)
    );
  };

  const isTie = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.placeMark(index, currentPlayer.marker)) {

      if (checkWinner()) {
        showMessage(`${currentPlayer.name} wins!`);
        gameOver = true;
        return;
      }

      if (isTie()) {
        showMessage("It's a tie!");
        gameOver = true;
        return;
      }

      switchPlayer();

    } else {
      console.log("Invalid move!");
    }
  };

  const resetGame = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
    showMessage("");
  };

  return { playRound, resetGame };
})();


// ================================
// 4. DISPLAY CONTROLLER (UI)
// ================================
const boxes = document.querySelectorAll(".box");
const restartBtn = document.getElementById("restart");

// message display
const messageDiv = document.createElement("h2");
messageDiv.style.color = "white";
messageDiv.style.marginTop = "10px";
document.body.appendChild(messageDiv);

function showMessage(msg) {
  messageDiv.textContent = msg;
}

function updateDisplay() {
  const board = Gameboard.getBoard();

  boxes.forEach((box, index) => {
    box.textContent = board[index];
  });
}


// ================================
// 5. EVENT LISTENERS
// ================================

boxes.forEach(box => {
  box.addEventListener("click", () => {

    if (box.textContent !== "") return; // prevent overwrite

    const index = box.dataset.index;

    GameController.playRound(Number(index));
    updateDisplay();
  });
});

// restart button
restartBtn.addEventListener("click", () => {
  GameController.resetGame();
  updateDisplay();
});