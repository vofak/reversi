import PieceEnum from "../../game_space/game/PieceEnum";
import getOpponent from "../ReversiUtils";
import MinMaxPlayer from "./MinMaxPlayer";

class StrongPlayer extends MinMaxPlayer {

    StablePieceEnum = Object.freeze({
        stable: {key: 1, val: 1},
        unstable: {key: 2, val: 0},
        oppStable: {key: 3, val: -1}
    });

    evaluateBoard(board) {
        let currentMobility = this.getCurrentMobility(board);
        let potentialMobility = this.getPotentialMobility(board);

        let stabilityBoard = this.getStabilityBoard(board);

        let internalStability = this.getInternalStability(stabilityBoard);
        let edgeStability = this.getEdgeStability(board, stabilityBoard);

        return this.evaluatePosition(board.getMoveNumber(), edgeStability, internalStability, currentMobility, potentialMobility);
    }

    getCurrentMobility(board) {
        let myMoves = 0;
        let opponentMoves = 0;

        let player = board.currPlayer;
        let opp = getOpponent(player);

        for (let rowIndex = 0; rowIndex < 8; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < 8; ++columnIndex) {
                if (board.get(rowIndex, columnIndex) !== PieceEnum.empty) {
                    continue;
                }
                let opponentStonesTrulyReversed = 0;
                let myStonesTrulyReversed = 0;
                for (let rowDiff = -1; rowDiff <= 1; ++rowDiff) {
                    for (let columnDiff = -1; columnDiff <= 1; ++columnDiff) {
                        let rowTemp = rowIndex + rowDiff;
                        let columnTemp = columnIndex + columnDiff;
                        if (board.isOnBoard(rowTemp, columnTemp)) {

                            if (board.get(rowTemp, columnTemp) === opp.piece) {

                                opponentStonesTrulyReversed += board.getToReverseInDirection(player, rowTemp, columnTemp, rowDiff, columnDiff);

                            } else if (board.get(rowTemp, columnTemp) === player.piece) {

                                myStonesTrulyReversed += board.getToReverseInDirection(opp, rowTemp, columnTemp, rowDiff, columnDiff);

                            }
                        }
                    }
                }

                if (opponentStonesTrulyReversed > 0 && myStonesTrulyReversed > 0) {
                    myMoves++;
                    opponentMoves++;
                } else if (opponentStonesTrulyReversed > 0) {
                    opponentMoves += 2;
                } else if (myStonesTrulyReversed > 0) {
                    myMoves += 2;
                }

            }
        }

        return 1000 * (myMoves - opponentMoves) / (myMoves + opponentMoves + 2);
    }

    getPotentialMobility(board) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        let myNumber1 = 0;  //frontierStones
        let myNumber2 = 0;
        let myNumber3 = 0;
        let opponentNumber1 = 0;  //frontierStones
        let opponentNumber2 = 0;
        let opponentNumber3 = 0;

        for (let rowIndex = 0; rowIndex < 8; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < 8; ++columnIndex) {
                let currPiece = board.get(rowIndex, columnIndex);
                if (currPiece === opp) {
                    if (this.isFrontierStone(board, rowIndex, columnIndex)) {
                        myNumber1++;
                    }
                } else if (currPiece === player) {
                    if (this.isFrontierStone(board, rowIndex, columnIndex)) {
                        opponentNumber1++;
                    }
                } else if (currPiece === PieceEnum.empty) {
                    for (let rowDiff = -1; rowDiff <= 1; ++rowDiff) {
                        for (let columnDiff = -1; columnDiff <= 1; ++columnDiff) {
                            let rowTemp = rowIndex + rowDiff;
                            let columnTemp = columnIndex + columnDiff;

                            if (board.isOnBoard(rowTemp, columnTemp)) {
                                let currTempPiece = board.get(rowTemp, columnTemp);
                                if (currTempPiece === opp) {
                                    myNumber3++;
                                } else if (currTempPiece === player) {
                                    opponentNumber3++;
                                }
                            }
                        }
                    }
                    if (myNumber3 > 0) {
                        myNumber2++;
                    }
                    if (opponentNumber3 > 0) {
                        opponentNumber2++;
                    }
                }
            }
        }

        let potentialMobility1 = 10 * (myNumber1 - opponentNumber1) / (myNumber1 + opponentNumber1 + 2);
        let potentialMobility2 = 10 * (myNumber2 - opponentNumber2) / (myNumber2 + opponentNumber2 + 2);
        let potentialMobility3 = 10 * (myNumber3 - opponentNumber3) / (myNumber3 + opponentNumber3 + 2);

        return potentialMobility1 + potentialMobility2 + potentialMobility3;
    }

    isFrontierStone(board, rowIndex, columnIndex) {
        for (let rowDiff = -1; rowDiff <= 1; ++rowDiff) {
            for (let columnDiff = -1; columnDiff <= 1; ++columnDiff) {
                let rowTemp = rowIndex + rowDiff;
                let columnTemp = columnIndex + columnDiff;

                if (board.isOnBoard(rowTemp, columnTemp)) {
                    if (board[rowTemp][columnTemp] === PieceEnum.empty) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getStabilityBoard(board) {
        let stabilityBoard = [];
        for (let i = 0; i < 8; i++) {
            let stabilityRow = [];
            for (let j = 0; j < 8; j++) {
                stabilityRow.push(this.StablePieceEnum.unstable);
            }
            stabilityBoard.push(stabilityRow);
        }


        this.markStableCorners(board, stabilityBoard);

        this.markStableStonesFrom0_0Corner(board, stabilityBoard);
        this.markStableStonesFrom0_7Corner(board, stabilityBoard);
        this.markStableStonesFrom7_7Corner(board, stabilityBoard);
        this.markStableStonesFrom7_0Corner(board, stabilityBoard);

        return stabilityBoard;
    }

    markStableCorners(board, stabilityBoard) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        if (board.get(0, 0) === player.piece) {
            stabilityBoard[0][0] = this.StablePieceEnum.stable;
        } else if (board.get(0, 0) === opp.piece) {
            stabilityBoard[0][0] = this.StablePieceEnum.oppStable;
        }

        if (board.get(0, 7) === player.piece) {
            stabilityBoard[0][7] = this.StablePieceEnum.stable;
        } else if (board.get(0, 7) === opp.piece) {
            stabilityBoard[0][7] = this.StablePieceEnum.oppStable;
        }

        if (board.get(7, 7) === player.piece) {
            stabilityBoard[7][7] = this.StablePieceEnum.stable;
        } else if (board.get(7, 7) === opp.piece) {
            stabilityBoard[7][7] = this.StablePieceEnum.oppStable;
        }

        if (board.get(7, 0) === player.piece) {
            stabilityBoard[7][0] = this.StablePieceEnum.stable;
        } else if (board.get(7, 0) === opp.piece) {
            stabilityBoard[7][0] = this.StablePieceEnum.oppStable;
        }
    }

    markStableStonesFrom0_0Corner(board, stabilityBoard) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        if (board.get(0, 0) === player.piece) {
            this.markStableStonesFrom0_0CornerForChosenPlayer(board, player, this.StablePieceEnum.stable, stabilityBoard);
        } else if (board.get(0, 0) === opp.piece) {
            this.markStableStonesFrom0_0CornerForChosenPlayer(board, opp, this.StablePieceEnum.oppStable, stabilityBoard);
        }

    }

    markStableStonesFrom0_0CornerForChosenPlayer(board, player, stablePiece, stabilityBoard) {
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            if (board.get(rowIndex, 0) === player.piece) {
                stabilityBoard[rowIndex][0] = stablePiece;
            } else {
                break;
            }
        }

        for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
            if (board.get(0, columnIndex) === player.piece) {
                stabilityBoard[0][columnIndex] = stablePiece;
            } else {
                break;
            }
        }

        for (let rowIndex = 1; rowIndex < 7; ++rowIndex) {
            for (let columnIndex = 1; columnIndex < 7; ++columnIndex) {
                if (board.get(rowIndex, columnIndex) !== player.piece) {
                    break;
                }
                if (stabilityBoard[rowIndex][columnIndex] !== stablePiece
                    && stabilityBoard[rowIndex][columnIndex - 1] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex - 1] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex + 1] === stablePiece) {

                    stabilityBoard[rowIndex][columnIndex] = stablePiece;
                }
            }
        }
    }

    markStableStonesFrom0_7Corner(board, stabilityBoard) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        if (board.get(0, 7) === player.piece) {
            this.markStableStonesFrom0_7CornerForChosenPlayer(board, player, this.StablePieceEnum.stable, stabilityBoard);
        } else if (board.get(0, 7) === opp.piece) {
            this.markStableStonesFrom0_7CornerForChosenPlayer(board, opp, this.StablePieceEnum.oppStable, stabilityBoard);
        }

    }

    markStableStonesFrom0_7CornerForChosenPlayer(board, player, stablePiece, stabilityBoard) {
        for (let rowIndex = 0; rowIndex < 8; ++rowIndex) {
            if (board.get(rowIndex, 7) === player.piece) {
                stabilityBoard[rowIndex][7] = stablePiece;
            } else {
                break;
            }
        }

        for (let columnIndex = 7; columnIndex >= 0; --columnIndex) {
            if (board.get(0, columnIndex) === player.piece) {
                stabilityBoard[0][columnIndex] = stablePiece;
            } else {
                break;
            }
        }

        for (let rowIndex = 1; rowIndex < 7; ++rowIndex) {
            for (let columnIndex = 6; columnIndex >= 1; --columnIndex) {
                if (board.get(rowIndex, columnIndex) !== player.piece) {
                    break;
                }
                if (stabilityBoard[rowIndex][columnIndex] !== stablePiece
                    && stabilityBoard[rowIndex][columnIndex + 1] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex + 1] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex] === stablePiece
                    && stabilityBoard[rowIndex - 1][columnIndex - 1] === stablePiece) {

                    stabilityBoard[rowIndex][columnIndex] = stablePiece;
                }
            }
        }
    }

    markStableStonesFrom7_7Corner(board, stabilityBoard) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        if (board.get(7, 7) === player.piece) {
            this.markStableStonesFrom7_7CornerForChosenPlayer(board, player, this.StablePieceEnum.stable, stabilityBoard);
        } else if (board.get(7, 7) === opp.piece) {
            this.markStableStonesFrom7_7CornerForChosenPlayer(board, opp, this.StablePieceEnum.oppStable, stabilityBoard);
        }
    }

    markStableStonesFrom7_7CornerForChosenPlayer(board, player, stablePiece, stabilityBoard) {
        for (let rowIndex = 7; rowIndex >= 0; --rowIndex) {
            if (board.get(rowIndex, 7) === player.piece) {
                stabilityBoard[rowIndex][7] = stablePiece;
            } else {
                break;
            }
        }

        for (let columnIndex = 7; columnIndex >= 0; --columnIndex) {
            if (board.get(7, columnIndex) === player.piece) {
                stabilityBoard[7][columnIndex] = stablePiece;
            } else {
                break;
            }
        }

        for (let rowIndex = 6; rowIndex >= 1; --rowIndex) {
            for (let columnIndex = 6; columnIndex >= 1; --columnIndex) {
                if (board.get(rowIndex, columnIndex) !== player.piece) {
                    break;
                }
                if (stabilityBoard[rowIndex][columnIndex] !== stablePiece
                    && stabilityBoard[rowIndex][columnIndex + 1] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex + 1] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex - 1] === stablePiece) {

                    stabilityBoard[rowIndex][columnIndex] = stablePiece;
                }
            }
        }
    }

    markStableStonesFrom7_0Corner(board, stabilityBoard) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        if (board.get(7, 0) === player.piece) {
            this.markStableStonesFrom7_0CornerForChosenPlayer(board, player, this.StablePieceEnum.stable, stabilityBoard);
        } else if (board.get(7, 0) === opp.piece) {
            this.markStableStonesFrom7_0CornerForChosenPlayer(board, opp, this.StablePieceEnum.oppStable, stabilityBoard);
        }
    }

    markStableStonesFrom7_0CornerForChosenPlayer(board, player, stablePiece, stabilityBoard) {
        for (let rowIndex = 7; rowIndex >= 0; --rowIndex) {
            if (board.get(rowIndex, 0) === player.piece) {
                stabilityBoard[rowIndex][0] = stablePiece;
            } else {
                break;
            }
        }

        for (let columnIndex = 0; columnIndex < 8; ++columnIndex) {
            if (board.get(7, columnIndex) === player.piece) {
                stabilityBoard[7][columnIndex] = stablePiece;
            } else {
                break;
            }
        }

        for (let rowIndex = 6; rowIndex >= 1; --rowIndex) {
            for (let columnIndex = 1; columnIndex < 7; --columnIndex) {
                if (board.get(rowIndex, columnIndex) !== player.piece) {
                    break;
                }
                if (stabilityBoard[rowIndex][columnIndex] !== stablePiece
                    && stabilityBoard[rowIndex][columnIndex - 1] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex - 1] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex] === stablePiece
                    && stabilityBoard[rowIndex + 1][columnIndex + 1] === stablePiece) {

                    stabilityBoard[rowIndex][columnIndex] = stablePiece;
                }
            }
        }
    }

    getInternalStability(stabilityBoard) {
        let stableStonesDifference = 0;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                stableStonesDifference += stabilityBoard[x][y].val;
            }
        }

        return stableStonesDifference * 100;
    }

    getEdgeStability(board, stabilityBoard) {
        let cornersEvaluation = this.getCornersEvaluation(stabilityBoard);
        let C_SquareEvaluation = this.getC_SquareEvaluation(board, stabilityBoard);
        let A_SquareEvaluation = this.getA_SquareEvaluation(board, stabilityBoard);
        let B_SquareEvaluation = this.getB_SquareEvaluation(board, stabilityBoard);

        return cornersEvaluation + C_SquareEvaluation + A_SquareEvaluation + B_SquareEvaluation;
    }

    getCornersEvaluation(stabilityBoard) {
        return (stabilityBoard[0][0].val + stabilityBoard[0][7].val + stabilityBoard[7][7].val + stabilityBoard[7][0].val) * 700;
    }

    getA_SquareEvaluation(board, stabilityBoard) {
        let stableReward = 1000;
        let unstableReward = 75;
        let neutralReward = 200;

        let ret = 0;
        ret += this.evaluatePos(board, stabilityBoard, 0, 2, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 0, 5, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 2, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 5, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 2, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 5, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 2, 7, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 5, 7, stableReward, unstableReward, neutralReward);

        return ret;
    }

    getB_SquareEvaluation(board, stabilityBoard) {
        let stableReward = 1000;
        let unstableReward = 50;
        let neutralReward = 200;

        let ret = 0;
        ret += this.evaluatePos(board, stabilityBoard, 3, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 3, 7, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 0, 3, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 3, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 4, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 4, 7, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 0, 4, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 4, stableReward, unstableReward, neutralReward);

        return ret;
    }

    getC_SquareEvaluation(board, stabilityBoard) {
        let stableReward = 1200;
        let unstableReward = -25;
        let neutralReward = 200;

        let ret = 0;
        ret += this.evaluatePos(board, stabilityBoard, 0, 6, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 0, 1, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 6, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 1, 0, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 6, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 7, 1, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 6, 7, stableReward, unstableReward, neutralReward);
        ret += this.evaluatePos(board, stabilityBoard, 1, 7, stableReward, unstableReward, neutralReward);

        return ret;
    }

    evaluatePos(board, stabilityBoard, rowIndex, columnIndex, stableReward, unstableReward, neutralReward) {
        let player = board.currPlayer;
        let opp = getOpponent(player);

        let ret = 0;
        if (board.get(rowIndex, columnIndex) === player.piece) {
            if (this.isStableStone(stabilityBoard, rowIndex, columnIndex)) {
                ret += stableReward;
            } else if (this.isUnstableStone(board, rowIndex, columnIndex, player, opp)) {
                ret += unstableReward;
            } else {
                ret += neutralReward;
            }
        } else if (board.get(rowIndex, columnIndex) === opp.piece) {
            if (this.isStableStone(stabilityBoard, rowIndex, columnIndex)) {
                ret -= stableReward;
            } else if (this.isUnstableStone(board, rowIndex, columnIndex, player, opp)) {
                ret -= unstableReward;
            } else {
                ret -= neutralReward;
            }
        }
        return ret;
    }

    isStableStone(stabilityBoard, rowIndex, columnIndex) {
        return stabilityBoard[rowIndex][columnIndex] === this.StablePieceEnum.stable || stabilityBoard[rowIndex][columnIndex] === this.StablePieceEnum.oppStable;
    }

    isUnstableStone(board, rowIndex, columnIndex, player, opp) {
        if (board.get(rowIndex, columnIndex) !== player.piece) {
            return false;
        }
        if (rowIndex === 0 || rowIndex === 7) {
            let columnTemp = columnIndex;
            while (board.isOnBoard(rowIndex, columnTemp + 1)) {
                columnTemp += 1;
                if (columnTemp === opp.piece) {
                    columnTemp = columnIndex;
                    while (board.isOnBoard(rowIndex, columnTemp - 1)) {
                        columnTemp -= 1;
                        if (columnTemp === PieceEnum.empty) {
                            return true;
                        }
                    }
                } else if (columnTemp === PieceEnum.empty) {
                    while (board.isOnBoard(rowIndex, columnTemp - 1)) {
                        columnTemp -= 1;
                        if (columnTemp === opp.piece) {
                            return true;
                        }
                    }
                }
            }
        } else if (columnIndex === 7 || columnIndex === 0) {
            let rowTemp = rowIndex;
            while (board.isOnBoard(rowIndex, rowTemp + 1)) {
                rowTemp += 1;
                if (rowTemp === opp) {
                    rowTemp = rowIndex;
                    while (board.isOnBoard(rowIndex, rowTemp - 1)) {
                        rowTemp -= 1;
                        if (rowTemp === PieceEnum.empty) {
                            return true;
                        }
                    }
                } else if (rowTemp === PieceEnum.empty) {
                    while (board.isOnBoard(rowIndex, rowTemp - 1)) {
                        rowTemp -= 1;
                        if (rowTemp === opp) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    evaluatePosition(moveNumber, edgeStability, internalStability, currentMobility, potentialMobility) {
        let ESAC = this.getEdgeStabilityApplicationCoefficient(moveNumber);
        let ISAC = 36;
        let CMAC = this.getCurrentMobilityApplicationCoefficient(moveNumber);
        let PMAC = 99;

        return ESAC * edgeStability + ISAC * internalStability + CMAC * currentMobility + PMAC * potentialMobility;
    }

    getEdgeStabilityApplicationCoefficient(moveNumber) {
        return 312 + (6 * moveNumber);
    }

    getCurrentMobilityApplicationCoefficient(moveNumber) {
        let ret;
        if (moveNumber <= 25) {
            ret = 50 + (2 * moveNumber);
        } else {
            ret = 75 + moveNumber;
        }
        return ret;
    }
}


export default StrongPlayer;