import React from "react";
import './Menu.css';

class Menu extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {newGameEnabled: false}
    }

    setNewGameEnabled(newGameEnabled) {
        this.setState({newGameEnabled: newGameEnabled})
    }

    handleNewGameClick = () => {
        this.props.handleNewGameClick();
    }

    handleStatsClick = () => {
        this.props.handleStatsClick();
    }

    render() {
        return (
            <div className='Menu'>
                <button onClick={this.handleNewGameClick} disabled={!this.state.newGameEnabled}>New game</button>
                <button onClick={this.handleStatsClick}>Stats</button>
            </div>
        );
    }
}

export default Menu;