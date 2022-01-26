let board = [];

function displayBoard() {
    let grid = document.querySelector(".grid");

    for (i = 0; i < 9; i++) {
        board[i] = null;
        let boxElement = document.createElement('div');
        boxElement.classList.add('cell');
        boxElement.setAttribute('id', `box${i}`);
        grid.appendChild(boxElement);

    }
}

function clearBoard() {
    let cellList = document.querySelectorAll('.cell');
    cellList.forEach(cell => {
        cell.remove();
    });
    displayBoard();
}

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

displayBoard();

// board cells select
function gamePlay() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => markEntry(cell));
    });
}
gamePlay();
function markEntry(c) {
    let value = c.getAttribute('id')[3];
    
    console.log(board[value]);
    // entry check
    if (!board[value]) {
        board[value] = currentPlayer.sign;
        c.append(currentPlayer.sign);
        console.log(c);


        winCheck();
        tieCheck();
        if (currentPlayer === playerX){
            currentPlayer = playerO;
        } else {
                currentPlayer = playerX;
        }
        
    } else {
        console.log('cannot')
    }
}


function tieCheck() {
    let tie = true;
    board.forEach(cell => {
        if(cell){
            tie *= true;
        } else {
            tie *= false;
        }
    });
    if(tie){
        console.log('tie');
        clearBoard();
        gamePlay();
    }
}

// win check
function winCheck() {

    if (
        (board[0] === board[1] && board[0] === board[2] && (board[0] && board[1] && board[2]))
        || (board[0] === board[3] && board[0] === board[6] && (board[0] && board[3] && board[6]))
        || (board[0] === board[4] && board[0] === board[8] && (board[0] && board[4] && board[8]))
        || (board[1] === board[4] && board[1] === board[7] && (board[1] && board[4] && board[7]))
        || (board[2] === board[5] && board[2] === board[8] && (board[2] && board[5] && board[8]))
        || (board[2] === board[4] && board[2] === board[6] && (board[2] && board[4] && board[6]))
        || (board[3] === board[4] && board[3] === board[5] && (board[3] && board[4] && board[5]))
        || (board[6] === board[7] && board[6] === board[8] && (board[6] && board[7] && board[8]))
    ) {
        console.log('win');
        clearBoard();
        gamePlay();
    }
};
console.log(board);


//gameplay

