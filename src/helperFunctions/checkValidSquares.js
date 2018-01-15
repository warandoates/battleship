export default function checkValidSquares(squareId, size, horizontal, newBoard) {
    if (horizontal) {
        if (squareId % 10 + size > 11 || squareId % 10 === 0) return false;

        for (let i = 0; i <= size; i++) {
            if (!newBoard[squareId + i - 1]) return false;
            if (newBoard[squareId + i - 1].contents !== 'empty') return false;
        }

    } else {
        if (squareId + (10 * size) > 110) return false;
        for (let i = 0; i < size; i++) {
            if (!newBoard[squareId - 1 + (i * 10)]) return false;
            if (newBoard[squareId -1 + (i * 10)].contents !== 'empty') return false;
        }
    }
    return true;
}