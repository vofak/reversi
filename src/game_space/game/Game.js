import React from "react";
import './Game.css';

import Square from './Square'
import Board from '../../reversi/Board';
import SimplePlayer from "../../reversi/player/SimplePlayer";

class Game extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.createRefs();
        this.board = Board.getDefaultInitBoard();
        this.player = props.player;
        this.actualPlayer = new SimplePlayer(4);
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
        this.squares = squares;
    }

    makeMove = (square) => {

        let validMove = this.board.getMove(square.props.rowIndex, square.props.columnIndex);
        if (validMove) {
            this.board.makeMove(validMove);
            this.updateBoard();

            if (this.board.winner) {
                console.log(this.board.winner);
                return;
            }

            let compMove = this.actualPlayer.nextMove(this.board);
            this.board.makeMove(compMove);
            this.updateBoard();
            if (this.board.winner) {
                this.props.onGameOver(this.board.winner);
            }
        }
    };

    updateBoard() {
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
                let validMove = this.board.getMove(rowIndex, columnIndex);
                let square = this.squares[rowIndex][columnIndex].current;
                square.setMove(validMove);
                square.setPiece(this.board.get(rowIndex, columnIndex));
                square.setToReverse(false);
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
        return this.squares[position.rowIndex][position.columnIndex].current;
    }

    render() {
        return (
            <div className='board'>
                {this.board.grid.map((row, rowIndex) => {
                    return (
                        <div className='boardRow'>
                            {row.map((square, columnIndex) => {
                                let move = this.board.getMove(rowIndex, columnIndex);
                                return <Square rowIndex={rowIndex}
                                               columnIndex={columnIndex}
                                               ref={this.squares[rowIndex][columnIndex]}
                                               color='green'
                                               piece={this.board.get(rowIndex, columnIndex)}
                                               move={move}
                                               onClick={this.makeMove}
                                               onMouseEnter={this.onMouseEnterSquare}
                                               onMouseLeave={this.onMouseLeaveSquare}/>
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Game;