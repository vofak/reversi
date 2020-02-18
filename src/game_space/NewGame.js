import React from "react";
import './NewGame.css';

class NewGame extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='NewGame'>
                <p>start new ame</p>
            </div>
        );
    }
}

export default NewGame;