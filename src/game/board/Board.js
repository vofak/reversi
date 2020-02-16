import React from "react";
import './Board.css';

import PieceEnum from "./PieceEnum";
import Square from './Square'
import PlayerEnum from "./PlayerEnum";

class Board extends React.Component {

    initBoard() {
        let board = [];
        let squares = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            let squaresRow = [];
            for (let j = 0; j < 8; j++) {
                row.push(PieceEnum.empty);
                squaresRow.push(React.createRef())
            }
            board.push(row);
            squares.push(squaresRow);
        }
        this.squares = squares;
        board[3][3] = PieceEnum.black;
        board[4][4] = PieceEnum.black;
        board[4][3] = PieceEnum.white;
        board[3][4] = PieceEnum.white;
        return board;
    }

    constructor(props, context) {
        super(props, context);
        let board = this.initBoard();
        this.state = {board: board};
    }

    makeMove = (key) => {
        if (this.props.player === PlayerEnum.white) {
            this.getSquare(key).setPiece(PieceEnum.white);
        } else {
            this.getSquare(key).setPiece(PieceEnum.black);
        }
    };

    onMouseEnterSquare = (key) => {
        console.log("select");
        this.getSquare(key).setSelected(true);
    };

    onMouseLeaveSquare = (key) => {
        console.log("unselect");
        this.getSquare(key).setSelected(false);
    };

    getSquare(key) {
        return this.squares[Math.floor(key / 8)][key % 8].current;
    }

    encodePosition(rowIndex, columnIndex) {
        return rowIndex * 8 + columnIndex;
    }

    render() {
        let board = this.state.board;
        return (
            <div className='boardTable'>
                {board.map((row, rowIndex) => {
                    return (
                        <div className='boardRow'>
                            {row.map((square, columnIndex) => {
                                let key = this.encodePosition(rowIndex, columnIndex);
                                console.log(key);
                                return <Square key2={key}
                                               ref={this.squares[rowIndex][columnIndex]}
                                               color='green'
                                               piece={this.state.board[rowIndex][columnIndex]}
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

export default Board;