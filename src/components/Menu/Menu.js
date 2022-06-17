import React from "react";
import './Menu.css';

class Menu extends React.Component {

    /**
     * Constructs the menu component
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.state = {newGameEnabled: props.newGameEnabled}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.newGameEnabled !== prevProps.newGameEnabled) {
            this.setState({newGameEnabled: this.props.newGameEnabled});
        }
    }

    /**
     * Handler for clicking the new game button
     */
    handleNewGameClick = () => {
        this.props.handleNewGameClick();
    }

    /**
     * Handler for clicking the stats button
     */
    handleStatsClick = () => {
        this.props.handleStatsClick();
    }

    render() {
        return (
            <div className='Menu'>
                <button onClick={this.handleNewGameClick} disabled={!this.state.newGameEnabled}>New game</button>
                <button onClick={this.handleStatsClick}>Stats</button>
                <label className='OfflineIndicator'>Offline</label>
            </div>
        );
    }
}

export default Menu;