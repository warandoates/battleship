// Builds empty boards

export default function boardBuilder(playerId) {
    let emptyBoard = [];
    for (let i = 1; i <= 100; i++) {
        emptyBoard.push({
            id: i,
            owner: playerId,
            contents: 'empty',
            color: 'white',
            status: 'fresh'
        })
    }
    return emptyBoard
}