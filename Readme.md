# Create Gameboard
```js
//Use factory functions for
function gameboard(){
    return {a, b, c}
}
```

# Play a round
```js
function playRound(){
    return { a, b }
}
```

## Logic
Ask for coordinates of move
Determine which player moved
Place players token in grid
Evaluate for winner, if no winner, next round
If no winner and all cells full, tie,

Onclick playround, check win condition
playRound needs row, col, those are extracted from the e.target's data