class MinMaxPlayer {

    constructor(depth) {
        this.depth = depth ? depth : 4;
    }

    nextMove(board) {
        return this.negamax(board, this.depth, -100000000, 100000000).move;
    }

    negamax(board, depth, a, b) {
        if (depth === 0 || board.winner) {
            return {val: this.evaluateBoard(board)};
        }

        let validMoves = board.getValidMoves();

        let max = -100000;
        let res = null;
        for (let validMove of validMoves) {
            board.makeMove(validMove);

            let resLoc = this.negamax(board, depth - 1, a, b);
            if (resLoc.val > max) {
                max = resLoc.val;
                res = {val: resLoc.val, move: validMove};
            }

            if (res && res.val > a) {
                a = res.val;
            }
            if (a >= b) {
                break;
            }

            board.undoMove(validMove);
        }
        return res;
    }

    evaluateBoard(board) {
        throw new Error("You have to implement this function");
    }
}

export default MinMaxPlayer;