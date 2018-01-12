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
        case "SELECT_SHIP":
            return{
                ...currentState,
                selectedShip: action.data
            }
        default:
            return currentState
    }
}