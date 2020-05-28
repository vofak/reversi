import React from "react";
import './NewGame.css';
import DifficultyEnum from "./DifficultyEnum";
import PlayerEnum from "../engine/player/PlayerEnum";

class NewGame extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {selectedDifficulty: this.props.difficulty, selectedPlayer: this.props.player};
    }

    onDifficultyChange = (e) => {
        let difficulty = null;
        if (e.target.value === "random") {
            difficulty = DifficultyEnum.random;
        } else if (e.target.value === "hungry") {
            difficulty = DifficultyEnum.hungry;
        } else if (e.target.value === "simple") {
            difficulty = DifficultyEnum.simple;
        } else {
            throw new Error("Unknown difficulty");
        }
        this.setState({selectedDifficulty: difficulty});
    };

    onPlayerChange = (e) => {
        let player = null;
        if (e.target.value === "white") {
            player = PlayerEnum.white;
        } else if (e.target.value === "black") {
            player = PlayerEnum.black;
        } else {
            throw new Error("Unknown color");
        }
        this.setState({selectedPlayer: player});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onStartNewGame(this.state.selectedDifficulty, this.state.selectedPlayer);
    };

    render() {
        return (
            <div className='NewGame'>
                <form onSubmit={this.onSubmit}>
                    <div className='FormSection'>
                        <input type="radio" id="random" name="difficulty" value="random"
                               checked={this.state.selectedDifficulty === DifficultyEnum.random}
                               onChange={this.onDifficultyChange}/>
                        <label htmlFor="random">
                            Random
                        </label>
                        <input type="radio" id="hungry" name="difficulty" value="hungry"
                               checked={this.state.selectedDifficulty === DifficultyEnum.hungry}
                               onChange={this.onDifficultyChange}/>
                        <label htmlFor="hungry">
                            Hungry
                        </label>
                        <input type="radio" id="simple" name="difficulty" value="simple"
                               checked={this.state.selectedDifficulty === DifficultyEnum.simple}
                               onChange={this.onDifficultyChange}/>
                        <label htmlFor="simple">
                            Simple
                        </label>
                    </div>

                    <div className='FormSection'>
                        <input type="radio" id="white" name="color" value="white"
                               checked={this.state.selectedPlayer === PlayerEnum.white}
                               onChange={this.onPlayerChange}/>
                        <label htmlFor="white">
                            White
                        </label>
                        <input type="radio" id="black" name="color" value="black"
                               checked={this.state.selectedPlayer === PlayerEnum.black}
                               onChange={this.onPlayerChange}/>
                        <label htmlFor="black">
                            Black
                        </label>
                    </div>

                    <footer>
                        <input type='submit' value='Start Game'/>
                    </footer>
                </form>
            </div>
        );
    }
}

export default NewGame;