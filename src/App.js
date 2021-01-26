import React, {useCallback, useEffect, useState} from "react";
import Board from "./components/Board/Board";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation/Navigation";
import {CHOOSING_LEVEL, PAUSED, PENDING, STARTED} from "./helpers/gameState";
import Popup from "./components/Popup/Popup";
import ChooseLevel from "./components/Navigation/ChooseLevel";
import Paused from "./components/Popup/Paused";

const App = () => {
    const [gameState, setGameState] = useState(PENDING);
    const [gameLevel, setGameLevel] = useState(-1);
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const [popupContent, setPopupContent] = useState({
        heading: "",
        content: "",
        button: null
    });

    const escFunction = useCallback((event) => {
        if (event.key === 'p') {
            setGameState(PAUSED);
            if (gameState === PAUSED) {
                setGameState(STARTED);
            }
        }
    }, [gameState]);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState])

    return (
        <div className="app">
            {gameState === PAUSED && <Paused />}
            {isPopupOpened && <Popup
                setIsPopupOpened={setIsPopupOpened}
                content={popupContent}
            />}
            <div className="flex-wrapper">

                {gameState === PENDING ?
                    <React.Fragment>
                        <Logo/>
                        <Navigation
                            setGameState={setGameState}
                            setIsPopupOpened={setIsPopupOpened}
                            setPopupContent={setPopupContent}
                        />
                    </React.Fragment> :
                    gameState === CHOOSING_LEVEL ?
                        <ChooseLevel
                            setGameState={setGameState}
                            setGameLevel={setGameLevel}
                        /> :
                        <Board
                            gameLevel={gameLevel}
                            setGameState={setGameState}
                            gameState={gameState}
                            setIsPopupOpened={setIsPopupOpened}
                            setPopupContent={setPopupContent}
                            popupContent={popupContent}
                        />
                }
            </div>
        </div>
    );
};

export default App;