import React from 'react';
import './App.css';
import Game from "./game/Game";
import Stats from "./stats/Stats";

function App() {
    return (
        <div className='AppRow'>
            <Game/>
            <Stats/>
        </div>
    );
}

export default App;
