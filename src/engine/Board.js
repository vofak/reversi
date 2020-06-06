import PieceEnum from "../game_space/game/PieceEnum";
import React from "react";
import PlayerEnum from "./player/PlayerEnum";
import getOpponent from "./ReversiUtils";

class Board {
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

    static getDefaultInitBoard() {
        let ret = new Board();
        ret.grid[3][3] = PieceEnum.black;
        ret.grid[4][4] = PieceEnum.black;
        ret.grid[4][3] = PieceEnum.white;
        ret.grid[3][4] = PieceEnum.white;
        ret.playerPieceCount = 2;
        return ret;
    }

    get(rowIndex, columnIndex) {
        return this.grid[rowIndex][columnIndex];
    }

    set(position, piece) {
        this.grid[position.rowIndex][position.columnIndex] = piece;
        this.validMoves = null;
    }

    getMoveNumber() {
        return this.moveNumber;
    }

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

    undoMove(move) {
        this.set(move, PieceEnum.empty);
        for (let toReverse of move.toReverse) {
            this.set(toReverse, this.currPlayer.piece);
        }
        this.currPlayer = getOpponent(this.currPlayer);
        this.winner = null;
        this.moveNumber--;
    }

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

    isValidMove(rowIndex, columnIndex) {
        let validMoves = this.getValidMoves(this.currPlayer);
        for (let validMove of validMoves) {
            if (validMove.rowIndex === rowIndex && validMove.columnIndex === columnIndex) {
                return true;
            }
        }
        return false;
    }

    getMove(rowIndex, columnIndex) {
        let validMoves = this.getValidMoves(this.currPlayer);
        for (let validMove of validMoves) {
            if (validMove.rowIndex === rowIndex && validMove.columnIndex === columnIndex) {
                return validMove;
            }
        }
        return false;
    }

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

    isOnBoard(rowIndex, columnIndex) {
        return rowIndex >= 0 && rowIndex < 8
            && columnIndex >= 0 && columnIndex < 8;
    }
}

export default Board;