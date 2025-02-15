function Gameboard(){
    const rows = 3;
    const cols = 3;
    const board = [];
    const screenBoard = document.querySelector('.screen-board');

    for (let i=0; i<rows; i++){
        board[i] = [];
        for (j=0; j<cols; j++){
            board[i][j] = Cell();
        }
    }

    for (let i=0; i<rows; i++){
        const newDivRow = document.createElement('div');
        newDivRow.classList.add('row');
        for (j=0; j<cols; j++){
            const newDivCell = document.createElement('div')
            newDivCell.classList.add('cell');
            newDivCell.dataset.row = i;
            newDivCell.dataset.col = j;
            newDivRow.appendChild(newDivCell)
        }
        screenBoard.appendChild(newDivRow)
    }


    const getBoard = () => board;
    const printBoard = () => {
        // const boardWithValues;
        for (let i=0; i<board.length; i++){
            console.log(board[i].map((cell) => cell.getValue()));
        }        
    }
    const evalCell = (row, col) => {
        return board[row][col].getValue();
    }
    const changeCell = (row, col, player) => {
        board[row][col].changeToken(player);
    }

    return { getBoard, printBoard, evalCell, changeCell }
}
function Player(name, token){
    this.name = name;
    this.token = token;
}
function Cell(){
    let value = 0;

    const changeToken = (player) => {
        value = player.token;
    }
    const getValue = () => value;
    return { changeToken, getValue }
}

function gameController(){
    const  gameboardObj= Gameboard();
    const player1 = new Player('Player1', 'X');
    const player2 = new Player('Player2', 'Y')

    let activePlayer = player1;
    const switchTurns = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActivePlayer = () => activePlayer;
    const printRound = () => {
        gameboardObj.printBoard();
        console.log(`${activePlayer.name}'s Turn`)
    }
    const playRound = (row,col) => {
        let pickedCellVal = gameboardObj.evalCell(row,col);
        if (pickedCellVal !== 0) {
            console.log(`Cell Taken. ${activePlayer.name}'s turn still`)
        }
        else {
            gameboardObj.changeCell(row,col,activePlayer);
            if (checkWin()) {
                console.log(`Player ${activePlayer.name} wins!`);
                printRound();
                try {
                    process.exit(0);
                  } catch (error) {
                    console.error('Tried process.exit(0) but not in node.js env');
                  }
                return
            }
            switchTurns();
            console.log("===========")
            printRound();
        }  
    }
    const checkGameEnd = () => {
        const values = gameboardObj.getBoard().flat()
                        .map( cell => cell.getValue())
        if (!values.includes(0)){
            console.log('Game Over')
        }
    }
    const checkWin = () => {
        // Check rows
        const board = gameboardObj.getBoard()
        for (let row = 0; row < 3; row++) {
          if (board[row][0].getValue() !== 0 &&
              board[row][0].getValue() === board[row][1].getValue() &&
              board[row][1].getValue() === board[row][2].getValue()) {
            return true;
          }
        }
      
        // Check columns
        for (let col = 0; col < 3; col++) {
          if (board[0][col].getValue() !== 0 &&
              board[0][col].getValue() === board[1][col].getValue() &&
              board[1][col].getValue() === board[2][col].getValue()) {
            return true;
          }
        }
      
        // Check diagonals
        if (board[0][0].getValue() !== 0 &&
            board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue()) {
          return true;
        }
      
        if (board[0][2].getValue() !== 0 &&
            board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue()) {
          return true;
        }
      
        return false;  // No winner yet
      }
      
    checkGameEnd()
    printRound();
    return { playRound, getActivePlayer }

}

function ScreenController() {
    const game = gameController();
    const screenBoard = document.querySelector('.screen-board');

    const updateTurnDisplay = () => {
        const activePlayer = game.getActivePlayer();
        const heading = document.querySelector('h1');
        heading.textContent = `${activePlayer.name}'s turn. Token: ${activePlayer.token}`
    }
    function updateCellDisplay(cell, player){
        cell.textContent = player.token
    }
    const handleCellClick = (e) => {
        const cell = e.target;
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        console.log({ row, col });
        game.playRound(row,col);
        updateCellDisplay(cell, game.getActivePlayer());
        updateTurnDisplay();

    }
    const init = () => {
        updateTurnDisplay()
        screenBoard.addEventListener('click', handleCellClick)
    }
    init();
}

ScreenController()