function gameboard(){
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i=0; i<rows; i++){
        board[i] = [];
        for (j=0; j<cols; j++){
            board[i][j] = Cell();
        }
    }
    const getBoard = () => board
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
    const board = gameboard();
    const player1 = new Player('Player1', 'X');
    const player2 = new Player('Player2', 'Y')

    let activePlayer = player1;
    const switchTurns = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActivePlayer = () => activePlayer;
    const printRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s Turn`)
    }
    const playRound = (row,col) => {
        let pickedCellVal = board.evalCell(row,col);
        if (pickedCellVal !== 0) {
            console.log(`Cell Taken. ${activePlayer.name}'s turn still`)
        }
        else {
            board.changeCell(row,col,activePlayer);
            if (checkWin()) {
                console.log(`Player ${activePlayer} wins!`);
                printRound();
                return
            }
            switchTurns();
            console.log("===========")
            printRound();
        }  
    }
    const checkGameEnd = () => {
        const values = board.getBoard().flat()
                        .map( cell => cell.getValue())
        if (!values.includes(0)){
            console.log('Game Over')
        }
    }
    const checkWin = () => {
        // Check rows
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

const game = gameController();
game.playRound(1,2);
game.playRound(1,1);
game.playRound(1,1);
game.playRound(0,0);
