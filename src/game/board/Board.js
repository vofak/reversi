import React from "react";
import './Board.css';
import Piece from "./Piece";
import Square from './Square'

class Board extends React.Component {

    initBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(Piece.empty);
            }
            board.push(row);
        }
        board[3][3] = Piece.white;
        board[4][4] = Piece.white;
        board[4][3] = Piece.black;
        board[3][4] = Piece.black;
        return board;
    }

    constructor(props, context) {
        super(props, context);
        let board = this.initBoard();
        this.state = {board: board}
    }

    render() {
        let board = this.state.board;
        return (
            <div className='boardTable'>
                {board.map((row, rowIndex) => {
                    return (
                        <div className='boardRow'>
                            {row.map((square, columnIndex) => {
                                let squareColor = columnIndex % 2 === rowIndex % 2 ? 'white' : 'black';
                                return <Square color={squareColor} piece={this.state.board[rowIndex][columnIndex]}/>
                            })}
                        </div>
                    )
                })}
            </div>
        )

    }
}

export default Board;