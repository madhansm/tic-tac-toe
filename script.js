const gameInit = (function(){
    const playerFactory = (playerName, sign) => {
        return { playerName, sign }
    };

    let theGame = {
        board: [],
        playerX: playerFactory('Matt', 'x'),
        playerO: playerFactory('Scott', 'o'),
    }

    let currentPlayer = theGame.playerX;

    function displayBoard() {
        let grid = document.querySelector(".grid");

        for (i = 0; i < 9; i++) {
            theGame.board[i] = null;
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
    return {theGame, currentPlayer, clearBoard}
})();

const gaming = (function(){
    function gamePlay() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => markEntry(cell));
        });
    }

    function markEntry(c) {
        let value = c.getAttribute('id')[3];

        console.log(gameInit.theGame.board[value]);
    // entry check
        if (!gameInit.theGame.board[value]) {
            gameInit.theGame.board[value] = gameInit.currentPlayer.sign;
            c.append(gameInit.currentPlayer.sign);
            console.log(c);
            winCheck();
            tieCheck();
            if (gameInit.currentPlayer === gameInit.theGame.playerX) {
                gameInit.currentPlayer = gameInit.theGame.playerO;
            } else {
                gameInit.currentPlayer = gameInit.theGame.playerX;
            }
        } else {
        console.log('cannot')
        }
    }

    function tieCheck() {
        let tie = true;
        gameInit.theGame.board.forEach(cell => {
            if (cell) {
                tie *= true;
            } else {
                tie *= false;
            }
        });
        if (tie) {
            console.log('tie');
            clearBoard();
            gamePlay();
        }
    }

// win check
    function winCheck() {
        let board = gameInit.theGame.board;
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
            gameInit.clearBoard();
            gamePlay();
        }
    };
    return {gamePlay}
})();

gameInit.clearBoard();
gaming.gamePlay();