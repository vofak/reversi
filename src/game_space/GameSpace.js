import React from "react";
import './GameSpace.css';

import NewGame from "./NewGame";
import Game from "./game/Game";
import AspectRatio from "../utils/AspectRatio";
import PlayerEnum from "../reversi/player/PlayerEnum";

class GameSpace extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {inGame: true, difficulty: 1, height: 0, width: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth * 0.7, height: window.innerHeight});
    }

    onGameOver = (winner) => {
        this.setState({inGame: false});
    };

    onStartNewGame = (difficulty) => {
        this.setState({inGame: true, difficulty: difficulty});
    };

    render() {
        return (
            <div className='GameSpace' style={{width: this.state.width, height: this.state.height}}>
                <AspectRatio ratio={1}>
                    {this.state.inGame ?
                        <Game player={PlayerEnum.white} onGameOver={this.onGameOver}/> :
                        <NewGame difficulty={1} onStartNewGame={this.onStartNewGame}/>}
                </AspectRatio>
            </div>
        );
    }
}

export default GameSpace;