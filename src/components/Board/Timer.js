import React, {useEffect, useState} from "react";
import {LOSE, PAUSED, PENDING, WIN} from "../../helpers/gameState";

const Timer = props => {
    const {gameState, setGameState, gameLevel, setIsPopupOpened, setPopupContent} = props;
    const [timeTotal, setTimeTotal] = useState(-1);
    const [timeLeft, setTimeLeft] = useState(-1);

    useEffect(() => {
        if(gameLevel === 1) {
            setTimeTotal(60);
            setTimeLeft(60);
        } else if(gameLevel === 2) {
            setTimeTotal(45);
            setTimeLeft(45);
        } else if(gameLevel === 3) {
            setTimeTotal(30);
            setTimeLeft(30);
        }
    }, [])

    useEffect(() => {
        if(timeLeft === 0) {
            setGameState(LOSE);
            setIsPopupOpened(true);
            setPopupContent({
                heading: "You lose!",
                content: "Time passed",
                button: <button className="btn" onClick={() => {
                    setGameState(PENDING);
                    setIsPopupOpened(false);
                }}>Play again!</button>
            });
            setTimeLeft(-1);
            setTimeTotal(-1);
            return;
        }

        const intervalId = setInterval(() => {
            if(gameState !== PAUSED) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        if(gameState === WIN || gameState === LOSE) {
            clearInterval(intervalId);
            return;
        }

        return () => clearInterval(intervalId);
    }, [timeLeft, gameState])

    return (
        <div className="timer">
            <div className="time-bar" style={{width: (timeLeft / timeTotal) * 100 + '%'}} />
        </div>
    );
};

export default Timer;