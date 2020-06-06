import React from "react";
import './Game.css';

import Square from './Square'
import Board from '../../engine/Board';
import SimplePlayer from "../../engine/player/SimplePlayer";
import DifficultyEnum from "../DifficultyEnum";
import RandomPlayer from "../../engine/player/RandomPlayer";
import HungryPlayer from "../../engine/player/HungryPlayer";
import PlayerEnum from "../../engine/player/PlayerEnum";

class Game extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.createRefs();
        this.board = Board.getDefaultInitBoard();
        this.player = props.player;
        this.image = props.image;
        switch (this.props.difficulty) {
            case DifficultyEnum.random:
                this.opponent = new RandomPlayer();
                break;
            case DifficultyEnum.hungry:
                this.opponent = new HungryPlayer();
                break;
            case DifficultyEnum.simple:
                this.opponent = new SimplePlayer();
                break;
            default:
                throw new Error("Unknown opponent player");
        }

        if (this.player !== PlayerEnum.white) {
            this.makeOpponentMove();
        }
        if (this.props.spaceHeight > this.props.spaceWidth) {
            this.state = {boardSize: this.props.spaceWidth}
        }
        else {
            this.state = {boardSize: this.props.spaceHeight}
        }
    }

    updateSize(spaceHeight, spaceWidth) {
        if (spaceHeight > spaceWidth) {
            this.setState({boardSize: spaceWidth})
        }
        else {
            this.setState({boardSize: spaceHeight})
        }
    }

    createRefs() {
        let squares = [];
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            let squaresRow = [];
            for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
                squaresRow.push(React.createRef())
            }
            squares.push(squaresRow);
        }
        this.squareRefs = squares;
    }

    makeMove = (square) => {
        let validMove = this.board.getMove(square.props.rowIndex, square.props.columnIndex);
        if (validMove) {
            this.board.makeMove(validMove);

            if (this.board.winner) {
                this.updateLocalStorage({winner: this.board.winner, pieceCount: this.board.playerPieceCount});
                this.props.onGameOver();
                return;
            }

            this.makeOpponentMove();
            this.updateBoard();
        }
    };

    makeOpponentMove() {
        let oppMove = this.opponent.nextMove(this.board);
        this.board.makeMove(oppMove);
        if (this.board.winner) {
            this.updateLocalStorage({winner: this.board.winner, pieceCount: this.board.playerPieceCount});
            this.props.onGameOver();
        }
    }

    updateBoard() {
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
                let validMove = this.board.getMove(rowIndex, columnIndex);
                let square = this.squareRefs[rowIndex][columnIndex].current;
                square.setMove(validMove);
                if (this.board.get(rowIndex, columnIndex) === this.player.piece && this.image) {
                    square.setPiece(this.image);
                } else {
                    square.setPiece(this.board.get(rowIndex, columnIndex));
                }
                square.setToReverse(false);
                square.forceUpdate();
            }
        }
    }

    onMouseEnterSquare = (square) => {
        let move = square.state.move;
        if (!move) {
            return;
        }
        for (let toReverse of move.toReverse) {
            this.getSquare(toReverse).setToReverse(true);
        }
    };

    onMouseLeaveSquare = (square) => {
        let move = square.state.move;
        if (!move) {
            return;
        }
        for (let toReverse of move.toReverse) {
            this.getSquare(toReverse).setToReverse(false);
        }
    };

    getSquare(position) {
        return this.squareRefs[position.rowIndex][position.columnIndex].current;
    }

    updateLocalStorage(gameStats) {
        let won = gameStats.winner === this.state.player ? 1 : 0;
        if (!localStorage.getItem("victories")) {
            localStorage.setItem("victories", won.toString());
        }
        localStorage.setItem("victories", (Number(localStorage.getItem("victories")) + won).toString());

        if (!localStorage.getItem("gamesPlayed")) {
            localStorage.setItem("gamesPlayed", won.toString());
        }
        localStorage.setItem("gamesPlayed", (Number(localStorage.getItem("gamesPlayed")) + 1).toString());

        if (!localStorage.getItem("piecesReversed")) {
            localStorage.setItem("piecesReversed", won.toString());
        }
        localStorage.setItem("piecesReversed", (Number(localStorage.getItem("piecesReversed")) + gameStats.pieceCount).toString());
    }

    render() {
        return (
                <div className='board'
                     style={{width: this.state.boardSize, height: this.state.boardSize}}>
                    {this.board.grid.map((row, rowIndex) => {
                        {
                            return row.map((square, columnIndex) => {
                                let piece;
                                if (this.board.get(rowIndex, columnIndex) === this.player.piece && this.image) {
                                    piece = this.image;
                                } else {
                                    piece = this.board.get(rowIndex, columnIndex);
                                }
                                return <Square rowIndex={rowIndex}
                                               columnIndex={columnIndex}
                                               ref={this.squareRefs[rowIndex][columnIndex]}
                                               piece={piece}
                                               move={this.board.getMove(rowIndex, columnIndex)}
                                               onClick={this.makeMove}
                                               onMouseEnter={this.onMouseEnterSquare}
                                               onMouseLeave={this.onMouseLeaveSquare}/>
                            })
                        }
                    })}
                </div>
        )
    }
}

export default Game;