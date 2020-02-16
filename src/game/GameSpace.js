import React from "react";
import './GameSpace.css';

import NewGame from "./NewGame";
import Board from "./board/Board";
import AspectRatio from "../utils/AspectRatio";
import PlayerEnum from "./board/PlayerEnum";

class GameSpace extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {inGame: true, difficulty: 1};

    }

    startNewGame(difficulty) {
        this.setState({inGame: true, difficulty: difficulty});
    }

    render() {
        return (
            <div className='GameSpace'>
                <AspectRatio ratio={1}>
                    {this.state.inGame ?
                        <Board player={PlayerEnum.white}/> :
                        <NewGame difficulty={1} startNewGame={this.startNewGame.bind(this)}/>}
                </AspectRatio>
            </div>
        );
    }
}

export default GameSpace;