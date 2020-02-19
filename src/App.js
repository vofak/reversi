import React from 'react';
import './App.css';
import GameSpace from "./game_space/GameSpace";
import Stats from "./stats/Stats";

class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.statsRef = React.createRef();
    }

    onStatsChanged = () => {
        this.statsRef.current.update();
    };

    render() {
        return (
            <div className='AppRow'>
                <GameSpace onStatsChanged={this.onStatsChanged}/>
                <Stats ref={this.statsRef}/>
            </div>
        );
    }
}

export default App;
