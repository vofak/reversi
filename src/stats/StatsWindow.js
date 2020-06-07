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

        let players = JSON.parse(localStorage.getItem('players'));
        let highestName;
        let highestCount = 0;
        for (let name in players) {
            if (!players.hasOwnProperty(name)) {
                continue;
            }
            let count = players[name];
            if (count > highestCount) {
                highestName = name;
                highestCount = count;
            }
        }
        let mostPlayed;
        if (!highestName) {
            mostPlayed = '-';
        }
        else {
            mostPlayed = `${highestName} (${highestCount})`;
        }

        this.setState({
            victories: Number(victories),
            gamesPlayed: Number(gamesPlayed),
            piecesReversed: Number(piecesReversed),
            mostPlayed: mostPlayed
        });
    }

    render() {
        return (
            <div className='Stats'>
                <h2>Stats</h2>
                <p>Games Played: {this.state.gamesPlayed}</p>
                <p>Won: {this.state.victories}</p>
                <p>Pieces Reversed: {this.state.piecesReversed}</p>
                <p>Most played: {this.state.mostPlayed}</p>
            </div>
        );
    }
}

export default StatsWindow;