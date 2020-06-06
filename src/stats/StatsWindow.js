import React from "react";

class StatsWindow extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {victories: 0};
    }

    componentDidMount() {
        this.update();
    }

    update() {
        let gamesPlayed = localStorage.getItem("gamesPlayed");
        if (!gamesPlayed) {
            gamesPlayed = "0";
        }
        let victories = localStorage.getItem("victories");
        if (!victories) {
            victories = "0";
        }
        let piecesReversed = localStorage.getItem("piecesReversed");
        if (!piecesReversed) {
            piecesReversed = "0";
        }
        this.setState({
            victories: Number(victories),
            gamesPlayed: Number(gamesPlayed),
            piecesReversed: Number(piecesReversed)
        });
    }

    render() {
        return (
            <div className='Stats'>
                <h2>Stats</h2>
                <p>Played: {this.state.gamesPlayed}</p>
                <p>Won: {this.state.victories}</p>
                <p>Pieces Reversed: {this.state.piecesReversed}</p>
            </div>
        );
    }
}

export default StatsWindow;