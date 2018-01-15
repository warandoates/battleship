import moment from 'moment'
import sentenceBuilder from '../helperFunctions/sentenceBuilder'
import checkValidSquares from '../helperFunctions/checkValidSquares'
import boardBuilder from '../helperFunctions/boardBuilder'
import startingShips from '../helperFunctions/startingShips'

export default function rootReducer(currentState = {
    stage: 'start',
    battleLog: [],
    selectedShip: {},
    player1Ships: startingShips(),
    player2Ships: startingShips()
}, action) {
    switch (action.type) {
        // Happens when player hits the START GAME button
        case "START_GAME":
            return {
                ...currentState,
                stage: 'setup',
                activePlayerId: 1,
                battleLog: [{time: moment(Date.now()).format('h:m:s'), sentence: "Battle Begins!!!"}],
                playerOneBoard: boardBuilder(1),
                playerTwoBoard: boardBuilder(2)
            };


        // Handles the process of choosing a ship from the list before assigning it to a sqaure
        case "SELECT_SHIP":
            return {
                ...currentState,
                selectedShip: {
                    name: action.data.selectedShipName,
                    size: action.data.selectedShipSize,
                    horizontal: action.data.selectedShipHorizontal
                }
            };

        // Handles the process of highlighting board when player is assigning ships to squares
        case "HOVER":
            let boardOfInterest = currentState.activePlayerId === 1
                ? currentState.playerOneBoard
                : currentState.playerTwoBoard;
            let newBoard = [...boardOfInterest];
            if (!checkValidSquares(
                    action.id,
                    currentState.selectedShip.size,
                    currentState.selectedShip.horizontal,
                    newBoard
                )) {
                return currentState
            }
            if (currentState.selectedShip.horizontal) {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    newBoard[action.id + i - 1].color = 'lightblue';
                }
            }
            else {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    newBoard[action.id + (i * 10) - 1].color = 'lightblue';
                }
            }
            return {
                ...currentState,
                boardOfInterest: newBoard
            }

        // Handles the process of de-highlighting board when player is assigning (and removes mouse from square)
        case "OFF_HOVER":
            let previousBoardOfInterest = currentState.activePlayerId === 1
                ? currentState.playerOneBoard
                : currentState.playerTwoBoard;
            let cleanedBoard = [...previousBoardOfInterest];
            if (!checkValidSquares(
                    action.id,
                    currentState.selectedShip.size,
                    currentState.selectedShip.horizontal,
                    cleanedBoard
                )) {
                return currentState
            }
            if (currentState.selectedShip.horizontal) {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    previousBoardOfInterest[action.id + i - 1].color = 'white';
                }
            } else {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    cleanedBoard[action.id + (i * 10) - 1].color = "white";
                }
            }
            return {
                ...currentState,
                previousBoardOfInterest: cleanedBoard
            };

        // Handles the process of assigning a Ship when clicking on the board
        case "ASSIGN":
            if (!currentState.selectedShip.name) return currentState
            let boardOfAssignment = currentState.activePlayerId === 1
                ? currentState.playerOneBoard
                : currentState.playerTwoBoard;
            let filledBoard = [...boardOfAssignment];
            if (!checkValidSquares(
                    action.id,
                    currentState.selectedShip.size,
                    currentState.selectedShip.horizontal,
                    filledBoard
                )) {
                return currentState
            }
            if (currentState.selectedShip.horizontal) {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let assignedSquareH = filledBoard[action.id + i - 1];
                    assignedSquareH.contents = currentState.selectedShip.name;
                    assignedSquareH.color = 'darkgrey';
                }
            }
            else {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let assignedSquareH = filledBoard[action.id + (i * 10) - 1];
                    assignedSquareH.contents = currentState.selectedShip.name;
                    assignedSquareH.color = 'darkgrey';
                }
            }
            // Makes current ship unavailable for duplicate placement
            currentState.activePlayerId === 1
                ?
                currentState.player1Ships.find(ship => ship.name === currentState.selectedShip.name).available = false
                :
                currentState.player2Ships.find(ship => ship.name === currentState.selectedShip.name).available = false

            // Handles Switch from Player 1 to Player 2 (assigning their pieces) - then the switch to Game Mode
            if (currentState.player1Ships.filter(ship => ship.available === true).length === 0) currentState.activePlayerId = 2;
            if (currentState.player2Ships.filter(ship => ship.available === true).length === 0) {
                currentState.stage = "game";
                currentState.activePlayerId = Math.ceil(Math.random() * 2);
            }
            return {
                ...currentState,
                boardOfAssignment: filledBoard,
                selectedShip: Object.assign({})
            };

        // An attack is when one player attempts to strike the other player's ships with a click
        case "ATTACK":
            let newPlayer1Ships = [...currentState.player1Ships];
            let newPlayer2Ships = [...currentState.player2Ships];
            let boardOfAttack = currentState.activePlayerId === 1
                ? currentState.playerTwoBoard
                : currentState.playerOneBoard;
            let postAttackBoard = [...boardOfAttack];
            let target = postAttackBoard[action.data.id - 1];
            if (target.status !== 'fresh') return currentState;
            else if (target.contents === 'empty') {
                target.status = 'miss'
            } else {
                target.status = 'hit';
                currentState.activePlayerId === 1 ?
                    newPlayer2Ships.find(ship => ship.name === action.data.contents).hits++
                    : newPlayer1Ships.find(ship => ship.name === action.data.contents).hits++
            }
            let logObject = {
                time: moment(Date.now()).format('h:m:s'),
                sentence: sentenceBuilder(action.data, currentState.activePlayerId)
            };
            let newLog = [...currentState.battleLog];
            newLog.unshift(logObject);

            return {
                ...currentState,
                activePlayerId: currentState.activePlayerId === 1 ? 2 : 1,
                battleLog: newLog,
                player1Ships: newPlayer1Ships,
                player2Ships: newPlayer2Ships
            };

        // End game condition when one player has lost their full fleet
        case "FLEET_LOST":
            return {
                ...currentState,
                stage: 'over',
                winner: action.loser_id === 2 ? 1 : 2
            };

        case "RESET_GAME":
            return {
                stage: 'start',
                battleLog: [],
                selectedShip: {},
                player1Ships: startingShips(),
                player2Ships: startingShips()
            };
        default:
            return currentState
    }
}
