import moment from 'moment'
import sentenceBuilder from '../helperFunctions/sentenceBuilder'
import checkValidSquares from '../helperFunctions/checkValidSquares'
import boardBuilder from '../helperFunctions/boardBuilder'
import startingShips from '../helperFunctions/startingShips'

let startingState = {
    stage: 'start',
    battleLog: [],
    selectedShip: {},
    player1Ships: startingShips(),
    player2Ships: startingShips()
};

export default function rootReducer(currentState = {...startingState}, action) {
    switch (action.type) {
        case "START_GAME":
            return {
                ...currentState,
                stage: 'setup',
                activePlayerId: 1,
                battleLog: [{time: moment(Date.now()).format('h:m:s'), sentence: "Battle Begins!!!"}],
                playerOneBoard: boardBuilder(1),
                playerTwoBoard: boardBuilder(2)
            }
        case "FLEET_LOST":
            return{
                ...currentState,
                stage: 'over',
                winner: action.loser_id === 2 ? 1 : 2
            }
        case "SELECT_SHIP":
            return {
                ...currentState,
                selectedShip: {
                    name: action.data.selectedShipName,
                    size: action.data.selectedShipSize,
                    horizontal: action.data.selectedShipHorizontal
                }
            };
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
                    let squareToColorH = newBoard.find(square => square.id === action.id + i)
                    if (squareToColorH.contents === 'empty') squareToColorH.color = 'lightblue';
                }
            }
            else {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let squareToColorV = newBoard.find(square => square.id === action.id + (i * 10))
                    if (squareToColorV.contents === 'empty') squareToColorV.color = 'lightblue';
                }
            }
            return {
                ...currentState,
                boardOfInterest: newBoard
            }
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
                    let squareToErase = previousBoardOfInterest.find(square => square.id === action.id + i)
                    if (squareToErase.contents === 'empty') squareToErase.color = 'white';
                }
            } else {
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let thisSquare = cleanedBoard.find(square => square.id === action.id + (i * 10))
                    if (thisSquare.contents === 'empty') thisSquare.color = 'white';
                }
            }
            return {
                ...currentState,
                previousBoardOfInterest: cleanedBoard
            };
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
                    let assignedSquareH = filledBoard.find(square => square.id === action.id + i)
                    assignedSquareH.contents = currentState.selectedShip.name;
                    assignedSquareH.color = 'darkgrey';
                }
            }
            else {
                if (action.id + (10 * currentState.selectedShip.size) > 110) {
                    return currentState
                }
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let assignedSquareH = filledBoard.find(square => square.id === action.id + (i * 10))
                    assignedSquareH.contents = currentState.selectedShip.name;
                    assignedSquareH.color = 'darkgrey';
                }
            }
            currentState.activePlayerId === 1
                ?
                currentState.player1Ships.find(ship => ship.name === currentState.selectedShip.name).available = false
                :
                currentState.player2Ships.find(ship => ship.name === currentState.selectedShip.name).available = false

            if (currentState.player1Ships.filter(ship => ship.available === true).length === 0) currentState.activePlayerId = 2;
            if (currentState.player2Ships.filter(ship => ship.available === true).length === 0) currentState.activePlayerId = 1;
            if (currentState.player1Ships.filter(ship => ship.available === true).length === 0 && currentState.player2Ships.filter(ship => ship.available === true).length === 0) {
                currentState.stage = "game";
                currentState.activePlayerId = Math.ceil(Math.random() * 2);
            }
            return {
                ...currentState,
                boardOfAssignment: filledBoard,
                selectedShip: Object.assign({})
            };
        case "ATTACK":
            let newPlayer1Ships = [...currentState.player1Ships];
            let newPlayer2Ships = [...currentState.player2Ships];
            let boardOfAttack = currentState.activePlayerId === 1
                ? currentState.playerTwoBoard
                : currentState.playerOneBoard;
            let postAttackBoard = [...boardOfAttack];
            let target = postAttackBoard.find(square => square.id === action.data.id);
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