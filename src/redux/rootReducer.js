export default function rootReducer(
    currentState = {
        stage: 'start',
        player1Ships: [
            {name: 'Carrier', size: 5, imgURL: 'images/001-carrier.png', available: true},
            {name: 'Battleship', size: 4, imgURL: 'images/002-battleship.png', available: true},
            {name: 'Cruiser', size: 3, imgURL: 'images/003-cruiser.png', available: true},
            {name: 'Sub', size: 3, imgURL: 'images/004-submarine.png', available: true},
            {name: 'Destroyer', size: 2, imgURL: 'images/005-destroyer.png', available: true}
        ],
        player2Ships: [
            {name: 'Carrier', size: 5, imgURL: 'images/001-carrier.png', available: true},
            {name: 'Battleship', size: 4, imgURL: 'images/002-battleship.png', available: true},
            {name: 'Cruiser', size: 3, imgURL: 'images/003-cruiser.png', available: true},
            {name: 'Sub', size: 3, imgURL: 'images/004-submarine.png', available: true},
            {name: 'Destroyer', size: 2, imgURL: 'images/005-destroyer.png', available: true}
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
        default:
            return currentState
    }
}