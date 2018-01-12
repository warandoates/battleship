export default function rootReducer(
    currentState = {
        stage: 'start'
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