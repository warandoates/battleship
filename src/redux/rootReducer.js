export default function rootReducer(
    currentState = {
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
            return{
                ...currentState,
                stage: 'setup',
                activePlayerId: Math.ceil(Math.random() * 2)
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
            else return{...currentState}
        case "SELECT_SHIP":
            return{
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
            let newBoard = [... boardOfInterest];
            if(currentState.selectedShip.horizontal) {
                if(action.id % 10 + currentState.selectedShip.size > 11 || action.id % 10 === 0) {
                    return currentState
                }
                for(let i = 0; i < currentState.selectedShip.size; i++)
                newBoard.find(square => square.id === action.id + i).color = 'blue';
            }
            else{
                if(action.id + (10 * currentState.selectedShip.size) > 110) {
                    return currentState
                }
                for(let i = 0; i < currentState.selectedShip.size; i++)
                    newBoard.find(square => square.id === action.id + (i * 10)).color = 'blue';
            }
        return {
            ...currentState,
            boardOfInterest: newBoard
        }
        case "OFF_HOVER":
            let previousBoardOfInterest = currentState.activePlayerId === 1
                ? currentState.playerOneBoard
                : currentState.playerTwoBoard;
            let cleanedBoard = [... previousBoardOfInterest];
            if(currentState.selectedShip.horizontal) {
                if (action.id % 10 + currentState.selectedShip.size > 11 || action.id % 10 === 0) {
                    return currentState
                }
                for(let i = 0; i < currentState.selectedShip.size; i++)
                    previousBoardOfInterest.find(square => square.id === action.id + i).color = 'white';
            }else{
                if(action.id + (10 * currentState.selectedShip.size) > 110) {
                    return currentState
                }
                for(let i = 0; i < currentState.selectedShip.size; i++)
                    cleanedBoard.find(square => square.id === action.id + (i * 10)).color = 'white';
            }
            return {
                ...currentState,
                previousBoardOfInterest: cleanedBoard
            }
        default:
            return currentState
    }
}