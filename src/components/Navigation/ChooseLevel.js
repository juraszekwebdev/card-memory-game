import React from "react";
import {STARTED} from "../../helpers/gameState";

const ChooseLevel = props => {
    const {setGameState, setGameLevel} = props;

    const handleChooseLevel = (level) => {
        setGameLevel(level);
        setGameState(STARTED);
    }

    return (
        <div className="navigation">
            <button className="btn" onClick={() => handleChooseLevel(1)}>Casual</button>
            <button className="btn" onClick={() => handleChooseLevel(2)}>Normal</button>
            <button className="btn" onClick={() => handleChooseLevel(3)}>Hard</button>
        </div>
    );
};

export default ChooseLevel;