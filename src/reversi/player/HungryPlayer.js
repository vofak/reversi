import MinMaxPlayer from "./MinMaxPlayer";

class HungryPlayer extends MinMaxPlayer {

    constructor() {
        super(1);
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

export default HungryPlayer;