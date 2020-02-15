import React from "react";
import './Game.css';
import NewGame from "./NewGame";
import Board from "./board/Board";
import AspectRatio from "../utils/AspectRatio";

class Game extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {inGame: true, difficulty: 1};

    }

    startNewGame(difficulty) {
        this.setState({inGame: true, difficulty: difficulty});
    }

    makeMove(board) {

    }

    render() {
        return (
            <div className='Game'>
                <AspectRatio ratio={1}>
                    {this.state.inGame ?
                        <Board makeMove={this.makeMove.bind(this)}/> :
                        <NewGame difficulty={1} startNewGame={this.startNewGame.bind(this)}/>}
                </AspectRatio>
            </div>
        );
    }
}

export default Game;