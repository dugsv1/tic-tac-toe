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
    const pickCell = (row, col, player) => {
        let legalTurn = false;
        if (board[row][col].getValue() !== 0) {
            console.log(`Cell full try again. Still ${player.name}'s turn`);
            return legalTurn
        }
        board[row][col].changeToken(player);
        return legalTurn = true;
    }

    return { getBoard, printBoard, pickCell }
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
        turn = board.pickCell(row, col, activePlayer);
        if (turn) {
            switchTurns();
            console.log("===========")
            printRound();
        }
        
    }
    const checkTie = () => {
        let values;
        [...values] = board.getBoard()
    }
    printRound();
    return { playRound, getActivePlayer }

}

const game = gameController();
game.playRound(1,2);
game.playRound(1,1);
game.playRound(1,1);
game.playRound(0,0);
