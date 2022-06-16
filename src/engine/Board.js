import PieceEnum from "../common/PieceEnum";
import PlayerEnum from "../common/PlayerEnum";
import getOpponent from "./ReversiUtils";

class Board {

    /**
     * Constructs the reversi board
     */
    constructor() {
        this.grid = [];
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            let row = [];
            for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
                row.push(PieceEnum.empty);
            }
            this.grid.push(row);
        }
        this.validMoves = null;
        this.currPlayer = PlayerEnum.white;
        this.moveNumber = 1;
        this.playerPieceCount = 0;
        this.winner = null;
    }

    /**
     * return a default classic initial board
     *
     * @returns {Board} the initial board
     */
    static getDefaultInitBoard() {
        let ret = new Board();
        ret.grid[3][3] = PieceEnum.black;
        ret.grid[4][4] = PieceEnum.black;
        ret.grid[4][3] = PieceEnum.white;
        ret.grid[3][4] = PieceEnum.white;
        ret.playerPieceCount = 2;
        return ret;
    }

    /**
     * Gets a piece at the given coordinate
     *
     * @param rowIndex y coordinate
     * @param columnIndex x coordinate
     * @returns {PieceEnum} piece on the position
     */
    get(rowIndex, columnIndex) {
        return this.grid[rowIndex][columnIndex];
    }

    /**
     * Sets a piece at a position
     *
     * @param position {*} position
     * @param piece {PieceEnum} piece to place
     */
    set(position, piece) {
        this.grid[position.rowIndex][position.columnIndex] = piece;
        this.validMoves = null;
    }

    /**
     * @returns {number} number of the current move
     */
    getMoveNumber() {
        return this.moveNumber;
    }

    /**
     * Makes a move
     *
     * @param move {*} move to make
     */
    makeMove(move) {
        if (!this.isValidMove(move.rowIndex, move.columnIndex)) {
            throw new Error("The intended move is invalid");
        }
        this.set(move, this.currPlayer.piece);
        for (let toReverse of move.toReverse) {
            this.set(toReverse, this.currPlayer.piece);
        }
        this.currPlayer = getOpponent(this.currPlayer);
        let validMoves = this.getValidMoves();
        if (validMoves.length > 0) {
            this.moveNumber++;
        } else {
            this.winner = this.findWinner();
        }
    }

    /**
     * Resolves the winner of the game
     *
     * @returns {PlayerEnum} the winner
     */
    findWinner() {
        let player = this.currPlayer;
        let opp = getOpponent(player);

        let playerCount = 0;
        let oppCount = 0;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let currPiece = this.get(i, j);
                if (currPiece === player.piece) {
                    playerCount++;
                } else if (currPiece === opp.piece) {
                    oppCount++;
                }
            }
        }
        this.playerPieceCount = playerCount;
        return playerCount > oppCount ? player : opp;
    }

    /**
     * Reverts a move
     *
     * @param move {*} move to reverts
     */
    undoMove(move) {
        this.set(move, PieceEnum.empty);
        for (let toReverse of move.toReverse) {
            this.set(toReverse, this.currPlayer.piece);
        }
        this.currPlayer = getOpponent(this.currPlayer);
        this.winner = null;
        this.moveNumber--;
    }

    /**
     * Returns valid moves
     *
     * @returns {null|*[]} an array of valid moves
     */
    getValidMoves() {
        if (this.validMoves === null) {
            if (!this.currPlayer) {
                return [];
            }
            let validMoves = [];
            for (let rowIndex = 0; rowIndex < 8; ++rowIndex) {
                for (let columnIndex = 0; columnIndex < 8; ++columnIndex) {
                    if (this.grid[rowIndex][columnIndex] !== PieceEnum.empty) {
                        continue;
                    }
                    let toReverse = this.getToReverse(this.currPlayer, rowIndex, columnIndex);
                    if (toReverse.length > 0) {
                        validMoves.push({rowIndex: rowIndex, columnIndex: columnIndex, toReverse: toReverse});
                    }
                }
            }
            this.validMoves = validMoves;
        }

        return this.validMoves;
    }

    /**
     * Resolves the validity of a move to the given coordinates
     *
     * @param rowIndex {Number} y coordinate
     * @param columnIndex {Number} x coordinate
     * @returns {boolean} is the move valid
     */
    isValidMove(rowIndex, columnIndex) {
        let validMoves = this.getValidMoves();
        for (let validMove of validMoves) {
            if (validMove.rowIndex === rowIndex && validMove.columnIndex === columnIndex) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param rowIndex y coordinate
     * @param columnIndex x coordinate
     * @returns {any|*|boolean} false if the move is not valid, the move otherwise
     */
    getMove(rowIndex, columnIndex) {
        let validMoves = this.getValidMoves();
        for (let validMove of validMoves) {
            if (validMove.rowIndex === rowIndex && validMove.columnIndex === columnIndex) {
                return validMove;
            }
        }
        return false;
    }

    /**
     *
     * @param player {PlayerEnum} player to move
     * @param rowIndex {Number} y coordinate
     * @param columnIndex {Number} x coordinate
     * @returns {[]} array of positions to be reversed by a move to the given coordinates
     */
    getToReverse(player, rowIndex, columnIndex) {
        let ret = [];

        for (let rowDiff = -1; rowDiff <= 1; ++rowDiff) {
            for (let columnDiff = -1; columnDiff <= 1; ++columnDiff) {
                if (rowDiff === 0 && columnDiff === 0) {
                    continue;
                }
                ret = ret.concat(this.getToReverseInDirection(player, rowIndex, columnIndex, rowDiff, columnDiff))
            }
        }
        return ret;
    }

    /**
     *
     * @param player {PlayerEnum} player to move
     * @param rowIndex {Number} y coordinate
     * @param columnIndex {Number} x coordinate
     * @param rowDiff {Number} y direction
     * @param columnDiff {Number} x direction
     * @returns {[]|*[]} array of positions to be reversed in the given direction by a move to the given coordinates
     */
    getToReverseInDirection(player, rowIndex, columnIndex, rowDiff, columnDiff) {
        let ret = [];

        let rowTemp = rowIndex;
        let columnTemp = columnIndex;
        while (true) {
            rowTemp += rowDiff;
            columnTemp += columnDiff;
            if (!this.isOnBoard(rowTemp, columnTemp)) {
                return [];
            }
            let currPiece = this.grid[rowTemp][columnTemp];
            if (currPiece === PieceEnum.empty) {
                return [];
            } else if (currPiece === player.piece) {
                return ret;
            }
            ret.push({rowIndex: rowTemp, columnIndex: columnTemp});
        }
    }

    /**
     *
     * @param rowIndex {Number} y coordinate
     * @param columnIndex {Number} x coordinate
     * @returns {boolean} indicator whether the given position is on the board
     */
    isOnBoard(rowIndex, columnIndex) {
        return rowIndex >= 0 && rowIndex < 8
            && columnIndex >= 0 && columnIndex < 8;
    }
}

export default Board;