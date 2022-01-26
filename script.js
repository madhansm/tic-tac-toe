let board = [];

// board empty
for (i = 0 ; i <9 ; i++){
    board.push(null);
}

// board display
console.log(board[0], board[1], board[2]);
console.log(board[3], board[4], board[5]);
console.log(board[6], board[7], board[8]);

// entry check
if(board[5]){
    console.log('cannot')
} else {
    board[5] = 'o';
}


// win check
if (
       (board[0] === board[1] && board[0] === board[2] && (board[0] && board[1] && board[2]))
    || (board[0] === board[3] && board[0] === board[6] && (board[0] && board[3] && board[6])) 
    || (board[0] === board[4] && board[0] === board[8] && (board[0] && board[4] && board[8]))
    || (board[1] === board[4] && board[1] === board[7] && (board[1] && board[4] && board[7]))
    || (board[2] === board[5] && board[2] === board[8] && (board[2] && board[5] && board[8]))
    || (board[2] === board[4] && board[2] === board[6] && (board[2] && board[4] && board[6]))
    || (board[3] === board[4] && board[3] === board[5] && (board[3] && board[4] && board[5])) 
    || (board[6] === board[7] && board[6] === board[8] && (board[6] && board[7] && board[8]))
){
    console.log('win');
}
console.log(board);

//person factory
const playerFactory = (playerName,sign) => {
    return {playerName, sign}
};

//player input
let playerX = playerFactory('Matt','x');
console.log(playerX);

let playerO = playerFactory('Scott','o');
console.log(playerO);

//current player
let currentPlayer = playerX;


//gameplay
