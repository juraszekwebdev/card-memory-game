import React from "react";
import Cards from "./Cards";
import Timer from "./Timer";
import Popup from "../Popup/Popup";
import {LOSE, WIN} from "../../helpers/gameState";

const Board = props => {
    const {gameLevel, gameState, setGameState, setIsPopupOpened, setPopupContent, popupContent} = props;
    return (
        <React.Fragment>
            {gameState === WIN && gameState !== LOSE && <Popup gameState={gameState} setGameState={setGameState} content={popupContent} />}
            <Timer gameState={gameState} setGameState={setGameState} gameLevel={gameLevel} setIsPopupOpened={setIsPopupOpened} setPopupContent={setPopupContent} />
            <Cards gameState={gameState} setGameState={setGameState} setIsPopupOpened={setIsPopupOpened} setPopupContent={setPopupContent} />
        </React.Fragment>
    );
};

export default Board;
