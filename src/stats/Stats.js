import React from "react";
import './Stats.css';

class Stats extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {victories: 0};
    }


    componentDidMount() {
        this.update();
    }

    update() {
        let victories = localStorage.getItem("victories");
        if (!victories) {
            victories = "0";
        }
        this.setState({victories: Number(victories)});
    }

    render() {
        return (
            <div className='Stats'>
                <p>Stats</p>
                <p>Won: {this.state.victories}</p>
            </div>
        );
    }
}

export default Stats;