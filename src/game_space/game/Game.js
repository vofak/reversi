import React from "react";
import './Game.css';
import tickFile from './tick.mp3';
import bellFile from './bell.mp3';

import Square from './Square'
import Board from '../../engine/Board';
import SimplePlayer from "../../engine/player/SimplePlayer";
import DifficultyEnum from "../DifficultyEnum";
import RandomPlayer from "../../engine/player/RandomPlayer";
import HungryPlayer from "../../engine/player/HungryPlayer";
import PlayerEnum from "../../engine/player/PlayerEnum";
import getOpponent from "../../engine/ReversiUtils";

class Game extends React.Component {

    /**
     * Constructs the game board component
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.createRefs();
        this.board = Board.getDefaultInitBoard();
        this.player = props.player;
        this.image = props.image;
        this.svg = props.svg;
        this.name = props.name;
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
        } else {
            this.state = {boardSize: this.props.spaceHeight}
        }
        this.tick = new Audio(tickFile);
        this.bell = new Audio(bellFile);
    }

    /**
     * Updates the size of the board area. The size of the actual board is computed from this.
     *
     * @param spaceHeight height of the board area
     * @param spaceWidth width of the board area
     */
    updateSize(spaceHeight, spaceWidth) {
        if (spaceHeight > spaceWidth) {
            this.setState({boardSize: spaceWidth})
        } else {
            this.setState({boardSize: spaceHeight})
        }
    }

    /**
     * Creates refs for the squares on the board
     */
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

    /**
     * Makes a move to the given square
     *
     * @param square {Square} the square
     */
    makeMove = (square) => {
        let validMove = this.board.getMove(square.props.rowIndex, square.props.columnIndex);
        if (validMove) {
            this.board.makeMove(validMove);

            if (this.board.winner) {
                this.bell.pause();
                this.bell.currentTime = 0;
                this.bell.play();
                this.updateLocalStorage({
                    winner: this.board.winner,
                    pieceCount: this.board.playerPieceCount,
                    name: this.name
                });
                alert(`${this.board.winner.name} won!!!`)
                this.props.onGameOver();
                return;
            }

            this.makeOpponentMove();
            this.updateBoard();
            this.tick.pause();
            this.tick.currentTime = 0;
            this.tick.play();
        }
    };

    /**
     * Makes opponents move
     */
    makeOpponentMove() {
        let oppMove = this.opponent.nextMove(this.board);
        this.board.makeMove(oppMove);
        if (this.board.winner) {
            this.bell.pause();
            this.bell.currentTime = 0;
            this.bell.play();
            this.updateLocalStorage({
                winner: this.board.winner,
                pieceCount: this.board.playerPieceCount,
                name: this.name
            });
            alert(`${this.board.winner.name} won!!!`)
            this.props.onGameOver();
        }
    }

    /**
     * Updates the visual squares after moves
     */
    updateBoard() {
        for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
                let validMove = this.board.getMove(rowIndex, columnIndex);
                let square = this.squareRefs[rowIndex][columnIndex].current;
                square.setMove(validMove);
                if (this.board.get(rowIndex, columnIndex) === this.player.piece && this.image) {
                    square.setPiece(this.image);
                } else if (this.board.get(rowIndex, columnIndex) === getOpponent(this.player).piece && this.svg) {
                    square.setPiece(this.svg);
                } else {
                    square.setPiece(this.board.get(rowIndex, columnIndex));
                }
                square.setToReverse(false);
                square.forceUpdate();
            }
        }
    }

    /**
     * Handles a mouse entering a square
     *
     * @param square {Square} square
     */
    handleMouseEnterSquare = (square) => {
        let move = square.state.move;
        if (!move) {
            return;
        }
        for (let toReverse of move.toReverse) {
            this.getSquare(toReverse).setToReverse(true);
        }
    };

    /**
     * Handles a mouse leaving a square
     *
     * @param square {Square} square
     */
    onMouseLeaveSquare = (square) => {
        let move = square.state.move;
        if (!move) {
            return;
        }
        for (let toReverse of move.toReverse) {
            this.getSquare(toReverse).setToReverse(false);
        }
    };

    /**
     * @param position position of the square
     * @returns {Square} square component
     */
    getSquare(position) {
        return this.squareRefs[position.rowIndex][position.columnIndex].current;
    }

    /**
     * Updates the local storage after a game according to the stats of the game
     *
     * @param gameStats {*} game stats
     */
    updateLocalStorage(gameStats) {
        let won = gameStats.winner === this.player ? 1 : 0;
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

        let players = JSON.parse(localStorage.getItem("players"));
        if (players) {
            if (!players[gameStats.name]) {
                players[gameStats.name] = 0;
            }
            players[gameStats.name] += 1;
        } else {
            players = {}
            players[gameStats.name] = 1;
        }
        localStorage.setItem("players", JSON.stringify(players));
    }

    render() {
        return (
            <div className='board'
                 style={{width: this.state.boardSize, height: this.state.boardSize}}>
                {this.board.grid.map((row, rowIndex) => {
                    return row.map((square, columnIndex) => {
                        let piece;
                        if (this.board.get(rowIndex, columnIndex) === this.player.piece && this.image) {
                            piece = this.image;
                        } else if (this.board.get(rowIndex, columnIndex) === getOpponent(this.player).piece && this.svg) {
                            piece = this.svg;
                        } else {
                            piece = this.board.get(rowIndex, columnIndex);
                        }
                        return <Square rowIndex={rowIndex}
                                       columnIndex={columnIndex}
                                       ref={this.squareRefs[rowIndex][columnIndex]}
                                       piece={piece}
                                       move={this.board.getMove(rowIndex, columnIndex)}
                                       onClick={this.makeMove}
                                       onMouseEnter={this.handleMouseEnterSquare}
                                       onMouseLeave={this.onMouseLeaveSquare}/>
                    })
                })}
            </div>
        )
    }
}

export default Game;