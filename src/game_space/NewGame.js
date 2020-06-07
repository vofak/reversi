import React from "react";
import './NewGame.css';
import DifficultyEnum from "./DifficultyEnum";
import PlayerEnum from "../engine/player/PlayerEnum";
import SvgPaint from "./SvgPaint";



class NewGame extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {selectedDifficulty: DifficultyEnum.random, selectedPlayer: PlayerEnum.white, name:''};
        this.svgPaint = React.createRef();
    }

    onDifficultyChange = (e) => {
        let difficulty = null;
        switch (e.target.value) {
            case "random":
                difficulty = DifficultyEnum.random;
                break;
            case "hungry":
                difficulty = DifficultyEnum.hungry;
                break;
            case "simple":
                difficulty = DifficultyEnum.simple;
                break;
            default:
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
        this.props.onStartNewGame(this.state.selectedDifficulty, this.state.selectedPlayer, this.state.image, this.state.name, this.svgPaint.current.empty ? null : this.svgPaint.current.getSvgData());
    };

    onDrop = (e) => {
        e.preventDefault();
        let images = e.dataTransfer.files;
        let image = images[0];
        if (image.type.split("/")[0] === "image") {
            let fr = new FileReader();
            fr.addEventListener("load", e => {
                let i = new Image();
                i.src = fr.result;
                this.setState({image: i})
            })
            fr.readAsDataURL(image);
        }
    };

    onNameChange = (e) => {
        this.setState({name: e.target.value})
    };

    render() {
        return (
            <div className='NewGame'>
                <form onSubmit={this.onSubmit}>
                    <div className='FormSection'>
                        <input type='text' id='name' placeholder='Name' required autoFocus autoComplete='off'
                        onChange={this.onNameChange}/>
                    </div>

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
                        <div className={'DnD'}
                             onDrop={this.onDrop}
                             onDragOver={e => e.preventDefault()}>{!this.state.image ? 'Drop a picture if you like' : 'Piece picture selected'}
                        </div>
                        <p>
                            Drag and Drop a picture of something you like so you can play as the picture.
                        </p>
                        <SvgPaint ref={this.svgPaint}/>
                        <p>
                            Draw a picture of something you don't like so the opponent plays as that. Left clicks for lines.
                            Left click + shift for clearing the canvas. Left Click + ctrl for starting a new path
                        </p>
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