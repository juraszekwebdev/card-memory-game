import React from "react";
import {CHOOSING_LEVEL} from "../../helpers/gameState";

const Navigation = props => {
    const {setGameState, setIsPopupOpened, setPopupContent} = props;

    const handleOpenPopup = () => {
        setPopupContent({
            heading: "Instructions",
            content: <React.Fragment>
                <p>Press [p] to pause game</p>
                <p>Flip is a timed card memory game.</p>
                <p>Click the green cards to see what symbol they uncoverand try to find the matching symbol underneath the other cards.</p>
                <p>Uncover two matching symbols at once to eliminate them from the game.</p>
                <p>Eliminate all cards as fast as you can to win the game. Have fun!</p>
            </React.Fragment>
        });
        setIsPopupOpened(true);
    };

    return (
        <div className="navigation">
            <button className="btn" onClick={() => setGameState(CHOOSING_LEVEL)}>Play</button>
            <button className="btn" onClick={handleOpenPopup}>Instructions</button>
        </div>
    );
};

export default Navigation;