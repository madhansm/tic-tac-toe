const gameInit = (function(){
    const playerFactory = (playerName, sign) => {
        function appenderName() {
            let playerElement = document.getElementById(sign);
            let playerDiv = document.createElement('div');
            playerDiv.classList.add('name')
            playerDiv.append(playerName);
            playerElement.appendChild(playerDiv);
        }
        function removeName() {
            let playerElement = document.querySelectorAll('.name');
            playerElement.forEach(element => {
                element.remove();
            });
            
        }
        return { playerName, sign, appenderName, removeName}
    };

    let theGame = {
        board: [],
        playerX: playerFactory('Chirs', 'X'),
        playerO: playerFactory('Scott', 'O'),
    }

    let currentPlayer = theGame.playerX;

    function displayBoard() {
        let grid = document.querySelector(".grid");
        theGame.playerX.appenderName();
        theGame.playerO.appenderName();
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
        theGame.playerX.removeName();
        theGame.playerO.removeName();
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

        function switchPlayer(){
            if (gameInit.currentPlayer === gameInit.theGame.playerX) {
                gameInit.currentPlayer = gameInit.theGame.playerO;
            } else {
                gameInit.currentPlayer = gameInit.theGame.playerX;
            }
        }
    // entry check
        if (!gameInit.theGame.board[value]) {
            gameInit.theGame.board[value] = gameInit.currentPlayer.sign;
            c.append(gameInit.currentPlayer.sign);

            setTimeout(function() { 
                winCheck();
                tieCheck();
                switchPlayer();
            }, 300);
            
        }
    }

    const winPopUp = document.querySelector('.winPopUp');

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
            const tiePopUp = document.querySelector('.tiePopUp');
            tiePopUp.style.display = 'flex';
            setTimeout(() => {
                tiePopUp.style.display = 'none';
            }, 2000);
            gameInit.clearBoard();
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
            const winDiv = document.createElement('div');
            winDiv.append(`${gameInit.currentPlayer.playerName} for ${gameInit.currentPlayer.sign} WINS!!`)
            winPopUp.appendChild(winDiv);
            winPopUp.style.display = 'flex';
            setTimeout(function(){
                winPopUp.style.display = 'none';
                winPopUp.removeChild(winDiv);
            },2000);
            gameInit.clearBoard();
            gamePlay(); 

        }
    };
    return {gamePlay}
})();

gameInit.clearBoard();
gaming.gamePlay();