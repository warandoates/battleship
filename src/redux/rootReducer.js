export default function rootReducer(
    currentState = {}, action) {
    switch (action.type) {
        case "BUILD_BOARD":
            if (action.playerId === 1) return {
                ...currentState,
                playerOneBoard: action.newBoard
            };
            else return {
                ...currentState,
                playerTwoBoard: action.newBoard
            };
        default:
            return currentState
    }
}