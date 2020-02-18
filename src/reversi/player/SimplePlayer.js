import MinMaxPlayer from "./MinMaxPlayer";

class SimplePlayer extends MinMaxPlayer {

    constructor(depth) {
        super(depth);
    }

    evaluateBoard(board) {
        let ret = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board.get(i, j) === board.currPlayer.piece) {
                    ret++;
                }
            }
        }
        return ret;
    }
}

export default SimplePlayer;