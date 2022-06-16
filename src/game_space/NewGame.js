import React from "react";
import './NewGame.css';
import DifficultyEnum from "./DifficultyEnum";
import PlayerEnum from "../engine/player/PlayerEnum";
import SvgPaint from "./SvgPaint";


class NewGame extends React.Component {

    /**
     * Constructs the new game form component
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedDifficulty: props.difficulty,
            selectedPlayer: props.player,
            name: props.name,
            image: props.image,
            svgPicture: props.svgPicture};
        this.svgPaint = React.createRef();
    }

    /**
     * Handler for changing the difficulty
     *
     * @param e event
     */
    handleDifficultyChange = (e) => {
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

    /**
     * Handler for changing the color
     *
     * @param e event
     */
    handlePlayerChange = (e) => {
        let player = null;
        if (e.target.value === "white") {
            player = PlayerEnum.white;
            this.svgPaint.current.setColor("black");
        } else if (e.target.value === "black") {
            player = PlayerEnum.black;
            this.svgPaint.current.setColor("white");
        } else {
            throw new Error("Unknown color");
        }
        this.setState({selectedPlayer: player});
    };

    /**
     * Handler for clicking the submit button
     *
     * @param e {Event} event
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onStartNewGame(
            this.state.selectedDifficulty,
            this.state.selectedPlayer,
            this.state.image,
            this.state.name,
            this.svgPaint.current.empty
                ? null
                : this.svgPaint.current.getSvgData());
    };

    /**
     * Handler for dropping a picture to the DnD area
     *
     * @param e event
     */
    handleDrop = (e) => {
        e.preventDefault();
        let images = e.dataTransfer.files;
        let image = images[0];
        if (image.type.split("/")[0] === "image") {
            let fr = new FileReader();
            fr.addEventListener("load", () => {
                let i = new Image();
                i.src = fr.result;
                this.setState({image: i})
            })
            fr.readAsDataURL(image);
        }
    };

    /**
     * Handler for changing the name of the player
     *
     * @param e event
     */
    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    };

    render() {
        return (
            <div className='NewGame'>
                <form onSubmit={this.handleSubmit}>
                    <div className='FormSection'>
                        <input type='text' id='name' placeholder='Name' required autoFocus autoComplete='off'
                               value={this.state.name}
                               onChange={this.handleNameChange}/>
                    </div>

                    <div className='FormSection'>
                        <input type="radio" id="random" name="difficulty" value="random"
                               checked={this.state.selectedDifficulty === DifficultyEnum.random}
                               onChange={this.handleDifficultyChange}/>
                        <label htmlFor="random">
                            Random
                        </label>
                        <input type="radio" id="hungry" name="difficulty" value="hungry"
                               checked={this.state.selectedDifficulty === DifficultyEnum.hungry}
                               onChange={this.handleDifficultyChange}/>
                        <label htmlFor="hungry">
                            Hungry
                        </label>
                        <input type="radio" id="simple" name="difficulty" value="simple"
                               checked={this.state.selectedDifficulty === DifficultyEnum.simple}
                               onChange={this.handleDifficultyChange}/>
                        <label htmlFor="simple">
                            Simple
                        </label>
                    </div>

                    <div className='FormSection'>
                        <input type="radio" id="white" name="color" value="white"
                               checked={this.state.selectedPlayer === PlayerEnum.white}
                               onChange={this.handlePlayerChange}/>
                        <label htmlFor="white">
                            White
                        </label>
                        <input type="radio" id="black" name="color" value="black"
                               checked={this.state.selectedPlayer === PlayerEnum.black}
                               onChange={this.handlePlayerChange}/>
                        <label htmlFor="black">
                            Black
                        </label>
                        <div className={'DnD'}
                             onDrop={this.handleDrop}
                             onDragOver={e => e.preventDefault()}>
                            {this.state.image ? 'Piece picture selected' : 'Drop a picture if you like'}
                        </div>
                        <p>
                            Drag and Drop a picture of something you like so you can play as the picture.
                        </p>
                        <SvgPaint ref={this.svgPaint} picture={this.state.svgPicture}/>
                        <p>
                            Draw a picture of something you don't like so the opponent plays as that. Left clicks for
                            lines.
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