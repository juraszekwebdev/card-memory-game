import React from "react";

const Card = ({card, handleToggleShowCard}) => {
    return (
        <div className={"card" + (card.matched ? " matched" : "") + (card.isVisible ? " visible" : "")} onClick={handleToggleShowCard}>
            <div className="flipper">
                <div className="front">
                </div>
                <div className="back">
                    {card.icon}
                </div>
            </div>
        </div>
    );
};

export default Card;