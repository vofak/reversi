import React from 'react';
import './App.css';
import GameSpace from "./game/GameSpace";
import Stats from "./stats/Stats";

function App() {
    return (
        <div className='AppRow'>
            <GameSpace/>
            <Stats/>
        </div>
    );
}

export default App;
