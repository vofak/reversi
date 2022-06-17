import React from 'react';
import './App.css';
import StatsWindow from "../Stats/StatsWindow";
import Menu from "../Menu/Menu";
import NewGame from "../NewGameForm/NewGame";
import Game from "../Game/Game";
import DifficultyEnum from "../../common/DifficultyEnum";
import PlayerEnum from "../../common/PlayerEnum";

class App extends React.Component {

    /**
     * Constructs  App component
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.gameRef = React.createRef();
        this.statsRef = React.createRef();
        this.state = {inGame: false, statsShowing: false}
        window.addEventListener('popstate', this.handlePopState);
        window.history.replaceState({inGame: this.state.inGame, statsShowing: this.state.statsShowing}, 'app');
        window.addEventListener('offline', this.handleLineChange);
        window.addEventListener('online', this.handleLineChange);
        if (window.navigator.onLine) {
            document.body.classList.remove('Offline')
        } else {
            document.body.classList.add('Offline')
        }
    }

    /**
     * Handler for changes between online and offline mode
     */
    handleLineChange = () => {
        if (window.navigator.onLine) {
            document.body.classList.remove('Offline')
        } else {
            document.body.classList.add('Offline')
        }
    }

    /**
     * Handler for the pop state event
     *
     * @param {Event} e pop state event
     */
    handlePopState = (e) => {
        if (e.state.statsShowing) {
            document.body.classList.add('ModalVisible');
        } else {
            document.body.classList.remove('ModalVisible');
        }
        this.setState(e.state);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    /**
     * Handler for the resize event
     */
    handleResize = () => {
        if (!this.state.inGame) {
            return;
        }
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (window.innerWidth <= 700) {
            h -= 100;
        } else {
            w -= 100;
        }
        this.gameRef.current.updateSize(h, w)
    };

    /**
     * Handler for clicking the 'New game' button
     */
    handleNewGameClick = () => {
        this.setState({inGame: false});
        window.history.pushState({inGame: false, statsShowing: this.state.statsShowing}, 'app');
    };

    /**
     * Handler for clicking the 'Stats' button
     */
    handleStatsClick = () => {
        this.setState({statsShowing: true});
        document.body.classList.add('ModalVisible');
        window.history.pushState({inGame: this.state.inGame, statsShowing: true}, 'app');
    };

    /**
     * Starts a new game with the parameters from the new form
     */
    handleStartNewGame = (difficulty, player, image, name, svg) => {
        this.setState({
            inGame: true,
            difficulty: difficulty,
            player: player,
            image: image,
            name: name,
            svg: svg
        });
        window.history.pushState({inGame: true, statsShowing: this.state.statsShowing}, 'app');
    };

    /**
     * Handles game over
     */
    handleGameOver = () => {
        this.setState({inGame: false});
        this.statsRef.current.update();
        window.history.pushState({inGame: false, statsShowing: this.state.statsShowing}, 'app');
    };

    /**
     * Handles the cross button on the stats modal window
     */
    handleCloseModalClick = () => {
        this.setState({statsShowing: false})
        document.body.classList.remove('ModalVisible');
        window.history.pushState({inGame: this.state.inGame, statsShowing: false}, 'app');
    };

    render() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (window.innerWidth <= 700) {
            h -= 100;
        } else {
            w -= 100;
        }
        return (
            <div>
                <div className='App'>
                    <section>
                        {this.state.inGame
                            ? <Game ref={this.gameRef}
                                    player={this.state.player}
                                    onGameOver={this.handleGameOver}
                                    difficulty={this.state.difficulty}
                                    image={this.state.image}
                                    name={this.state.name}
                                    svg={this.state.svg}
                                    spaceWidth={w}
                                    spaceHeight={h}/>
                            : <NewGame
                                player={this.state.player || PlayerEnum.white}
                                difficulty={this.state.difficulty || DifficultyEnum.random}
                                name={this.state.name || ''}
                                image={this.state.image}
                                svgPicture={this.state.svg}
                                onStartNewGame={this.handleStartNewGame}/>
                        }
                    </section>
                    <nav>
                        <Menu newGameEnabled={this.state.inGame}
                              handleNewGameClick={this.handleNewGameClick}
                              handleStatsClick={this.handleStatsClick}/>
                    </nav>
                </div>
                <div className={'Modal'}>
                    <div className={'ModalContent'}>
                        <button onClick={this.handleCloseModalClick}>x</button>
                        <StatsWindow ref={this.statsRef}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
