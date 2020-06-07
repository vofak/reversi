import React from 'react';
import './App.css';
import StatsWindow from "./stats/StatsWindow";
import Menu from "./menu/Menu";
import NewGame from "./game_space/NewGame";
import Game from "./game_space/game/Game";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.menuRef = React.createRef();
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

    handleLineChange = (e) => {
        if (window.navigator.onLine) {
            document.body.classList.remove('Offline')
        } else {
            document.body.classList.add('Offline')
        }
    }

    handlePopState = (e) => {
        if (e.state.statsShowing) {
            document.body.classList.add('ModalVisible');
        } else {
            document.body.classList.remove('ModalVisible');
        }
        this.setState(e.state);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
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

    handleNewGameClick = () => {
        this.setState({inGame: false});
        this.menuRef.current.setNewGameEnabled(false);
        window.history.pushState({inGame: false, statsShowing: this.state.statsShowing}, 'app');
    };

    handleStatsClick = () => {
        this.setState({statsShowing: true});
        document.body.classList.add('ModalVisible');
        window.history.pushState({inGame: this.state.inGame, statsShowing: true}, 'app');
    };

    handleStartNewGame = (difficulty, player, image, name, svg) => {
        this.menuRef.current.setNewGameEnabled(true);
        this.setState({inGame: true, difficulty: difficulty, player: player, image: image, name: name, svg: svg});
        window.history.pushState({inGame: true, statsShowing: this.state.statsShowing}, 'app');
    };

    handleGameOver = () => {
        this.setState({inGame: false});
        this.menuRef.current.setNewGameEnabled(false);
        this.statsRef.current.update();
        window.history.pushState({inGame: false, statsShowing: this.state.statsShowing}, 'app');
    };

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
                        {this.state.inGame ?
                            <Game ref={this.gameRef}
                                  player={this.state.player}
                                  onGameOver={this.handleGameOver}
                                  difficulty={this.state.difficulty}
                                  image={this.state.image}
                                  name={this.state.name}
                                  svg={this.state.svg}
                                  spaceWidth={w}
                                  spaceHeight={h}/>
                            :
                            <NewGame onStartNewGame={this.handleStartNewGame}/>
                        }
                    </section>
                    <nav>
                        <Menu ref={this.menuRef}
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
