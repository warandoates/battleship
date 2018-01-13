export default function rootReducer(currentState = {
    stage: 'start',
    selectedShip: {},
    player1Ships: [
        {name: 'Carrier', size: 5, imgURL: 'images/001-carrier.png', available: true, hits: 0},
        {name: 'Battleship', size: 4, imgURL: 'images/002-battleship.png', available: true, hits: 0},
        {name: 'Cruiser', size: 3, imgURL: 'images/003-cruiser.png', available: true, hits: 0},
        {name: 'Sub', size: 3, imgURL: 'images/004-submarine.png', available: true, hits: 0},
        {name: 'Destroyer', size: 2, imgURL: 'images/005-destroyer.png', available: true, hits: 0}
    ],
    player2Ships: [
        {name: 'Carrier', size: 5, imgURL: 'images/001-carrier.png', available: true, hits: 0},
        {name: 'Battleship', size: 4, imgURL: 'images/002-battleship.png', available: true, hits: 0},
        {name: 'Cruiser', size: 3, imgURL: 'images/003-cruiser.png', available: true, hits: 0},
        {name: 'Sub', size: 3, imgURL: 'images/004-submarine.png', available: true, hits: 0},
        {name: 'Destroyer', size: 2, imgURL: 'images/005-destroyer.png', available: true, hits: 0}
    ]
}, action) {
    switch (action.type) {
        case "START_GAME":
            return {
                ...currentState,
                stage: 'setup',
                activePlayerId: 1,
                battleLog: [{time: '8:30am', sentence: "p1's sunk p2's sub"}]
            }
        case "BUILD_BOARD":
            if (action.playerId === 1) return {
                ...currentState,
                playerOneBoard: action.newBoard
            };
            else if (action.playerId === 2) return {
                ...currentState,
                playerTwoBoard: action.newBoard
            };
            else return {...currentState}
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
            if (currentState.selectedShip.horizontal) {
                if (action.id % 10 + currentState.selectedShip.size > 11 || action.id % 10 === 0) {
                    return currentState
                }
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let squareToColorH = newBoard.find(square => square.id === action.id + i)
                    if (squareToColorH.contents === 'empty') squareToColorH.color = 'lightblue';
                }
            }
            else {
                if (action.id + (10 * currentState.selectedShip.size) > 110) {
                    return currentState
                }
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
            if (currentState.selectedShip.horizontal) {
                if (action.id % 10 + currentState.selectedShip.size > 11 || action.id % 10 === 0) {
                    return currentState
                }
                for (let i = 0; i < currentState.selectedShip.size; i++) {
                    let squareToErase = previousBoardOfInterest.find(square => square.id === action.id + i)
                    if (squareToErase.contents === 'empty') squareToErase.color = 'white';
                }
            } else {
                if (action.id + (10 * currentState.selectedShip.size) > 110) {
                    return currentState
                }
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
            if(!currentState.selectedShip.name) return currentState
            let boardOfAssignment = currentState.activePlayerId === 1
                ? currentState.playerOneBoard
                : currentState.playerTwoBoard;
            let filledBoard = [...boardOfAssignment];
            if (currentState.selectedShip.horizontal) {
                if (action.id % 10 + currentState.selectedShip.size > 11 || action.id % 10 === 0) {
                    return currentState
                }
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
            if (currentState.player1Ships.filter(ship => ship.available === true).length === 0 && currentState.player2Ships.filter(ship => ship.available === true).length === 0){
                currentState.stage = "game";
                currentState.activePlayerId = Math.ceil(Math.random() * 2);
            }


                return {
                    ...currentState,
                    boardOfAssignment: filledBoard,
                    selectedShip: Object.assign({})
                };


        default:
            return currentState
    }
}