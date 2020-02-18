class RandomPlayer {
    nextMove(board) {
        let validMoves = board.getValidMoves();
        let randomPos = Math.floor(Math.random() * validMoves.length);
        return validMoves[randomPos];
    }
}

export default RandomPlayer;