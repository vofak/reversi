import React from "react";
import './NewGame.css';
import DifficultyEnum from "./DifficultyEnum";

class NewGame extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {selectedDifficulty: this.props.difficulty};
    }

    onStartNewGame = () => {
        this.props.onStartNewGame(this.state.selectedDifficulty);
    };

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

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onStartNewGame(this.state.selectedDifficulty);
    };

    render() {
        return (
            <div className='NewGame'>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Random
                        <input type="radio" id="random" name="difficulty" value="random"
                               checked={this.state.selectedDifficulty === DifficultyEnum.random}
                               onChange={this.onDifficultyChange}/>
                    </label>
                    <label>
                        Hungry
                        <input type="radio" id="hungry" name="difficulty" value="hungry"
                               checked={this.state.selectedDifficulty === DifficultyEnum.hungry}
                               onChange={this.onDifficultyChange}/>
                    </label>
                    <label>
                        Simple
                        <input type="radio" id="simple" name="difficulty" value="simple"
                               checked={this.state.selectedDifficulty === DifficultyEnum.simple}
                               onChange={this.onDifficultyChange}/>
                    </label>
                    <input type='submit' value='start new game'/>
                </form>
            </div>
        );
    }
}

export default NewGame;