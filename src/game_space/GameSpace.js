import React from "react";
import './GameSpace.css';

import NewGame from "./NewGame";
import Game from "./game/Game";
import AspectRatio from "../utils/AspectRatio";
import PlayerEnum from "../reversi/player/PlayerEnum";
import DifficultyEnum from "./DifficultyEnum";

class GameSpace extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {inGame: false, player: PlayerEnum.white, difficulty: DifficultyEnum.hungry, height: 0, width: 0};
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

    onGameOver = (gameStats) => {
        alert(gameStats.winner.name + " won!!!");
        this.updateLocalStorage(gameStats);
        this.setState({inGame: false});
    };

    onStartNewGame = (difficulty, player) => {
        this.setState({inGame: true, difficulty: difficulty, player: player});
    };

    updateLocalStorage(gameStats) {
        let won = gameStats.winner === this.state.player ? 1 : 0;
        if (!localStorage.getItem("victories")) {
            localStorage.setItem("victories", won.toString());
        }
        localStorage.setItem("victories", (Number(localStorage.getItem("victories")) + won).toString());
        this.props.onStatsChanged();
    }

    render() {
        return (
            <div className='GameSpace' style={{width: this.state.width, height: this.state.height}}>
                <AspectRatio ratio={1}>
                    {this.state.inGame ?
                        <Game player={this.state.player} onGameOver={this.onGameOver}
                              difficulty={this.state.difficulty}/> :
                        <NewGame onStartNewGame={this.onStartNewGame} difficulty={this.state.difficulty} player={this.state.player}/>}
                </AspectRatio>
            </div>
        );
    }
}

export default GameSpace;