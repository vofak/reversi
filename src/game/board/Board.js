import React from "react";
import './Board.css';
import PieceEnum from "./PieceEnum";
import Square from './Square'

class Board extends React.Component {

    initBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(PieceEnum.empty);
            }
            board.push(row);
        }
        board[3][3] = PieceEnum.black;
        board[4][4] = PieceEnum.black;
        board[4][3] = PieceEnum.white;
        board[3][4] = PieceEnum.white;
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
                                return <Square color='green' piece={this.state.board[rowIndex][columnIndex]}/>
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Board;