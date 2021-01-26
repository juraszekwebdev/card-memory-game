import React, {useEffect, useState} from "react";
import Card from "./Card";
import _ from "lodash";
import {PENDING, STARTED, WIN} from "../../helpers/gameState";

const initialCards = [
    {
        id: 0,
        icon: <i className="fas fa-heart" />,
        matchWith: 1
    },
    {
        id: 1,
        icon: <i className="fas fa-heart" />,
        matchWith: 0
    },
    {
        id: 2,
        icon: <i className="fas fa-plus" />,
        matchWith: 3
    },
    {
        id: 3,
        icon: <i className="fas fa-plus" />,
        matchWith: 2
    },
    {
        id: 4,
        icon: <i className="fas fa-envelope" />,
        matchWith: 5
    },
    {
        id: 5,
        icon: <i className="fas fa-envelope" />,
        matchWith: 4
    },
    {
        id: 6,
        icon: <i className="fas fa-check" />,
        matchWith: 7
    },
    {
        id: 7,
        icon: <i className="fas fa-check" />,
        matchWith: 6
    },
    {
        id: 8,
        icon: <i className="fas fa-times" />,
        matchWith: 9
    },
    {
        id: 9,
        icon: <i className="fas fa-times" />,
        matchWith: 8
    },
    {
        id: 10,
        icon: <i className="fas fa-cloud" />,
        matchWith: 11
    },
    {
        id: 11,
        icon: <i className="fas fa-cloud" />,
        matchWith: 10
    },
    {
        id: 12,
        icon: <i className="fas fa-star" />,
        matchWith: 13
    },
    {
        id: 13,
        icon: <i className="fas fa-star" />,
        matchWith: 12
    },
    {
        id: 14,
        icon: <i className="fas fa-adjust" />,
        matchWith: 15
    },
    {
        id: 15,
        icon: <i className="fas fa-adjust" />,
        matchWith: 14
    }
]

const Cards = props => {
    const {gameState, setGameState, setPopupContent, setIsPopupOpened} = props;
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [cardsDisabled, setCardsDisabled] = useState(false);
    
    useEffect(() => {
        if(gameState === STARTED) {
            initBoard();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState])

    useEffect(() => {
        if(_.size(clickedCards) === 2) {
            matchCards();
            setTimeout(() => {
                hideCards();
            }, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedCards])

    useEffect(() => {
        if(_.size(_.filter(cards, {matched: true})) === _.size(initialCards)) {
            finishGame()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards])

    const initBoard = () => {
        shuffleCards();
    }

    const shuffleCards = () => {
        let newInitialCards = [...initialCards];
        _.forEach(newInitialCards, card => {
            card.isVisible = false;
            card.matched = false;
        })
        let shuffledCards = _.shuffle(newInitialCards);
        setCards([...shuffledCards]);
    }

    const matchCards = () => {
        setCardsDisabled(true);
        let newCards = [...cards];
        if (clickedCards[0].matchWith === clickedCards[1].id && clickedCards[0].id === clickedCards[1].matchWith) {

            setTimeout(() => {
                const cardOneIndex = _.findIndex(newCards, {id: clickedCards[0].id});
                const cardTwoIndex = _.findIndex(newCards, {id: clickedCards[1].id});
                newCards[cardOneIndex].matched = true;
                newCards[cardTwoIndex].matched = true;
                setCards(newCards);
            }, 500)
        }
    }

    const hideCards = () => {
        let newCards = [...cards];
        _.forEach(newCards, card => {
            card.isVisible = false;
        })
        setCards([...newCards]);
        setClickedCards([]);
        setCardsDisabled(false);
    }

    const finishGame = () => {
        setPopupContent({
            heading: "Congratulations!",
            content: "You won the game!",
            button: <button className="btn" onClick={() => {setGameState(PENDING); setIsPopupOpened(false);}}>Play again!</button>
        });
        setIsPopupOpened(true);
        setCards([]);
        setGameState(WIN);
    }

    const handleToggleShowCard = (cardId) => {
        let newCards = [...cards];
        const index = _.findIndex(newCards, {id: cardId});
        const card = newCards[index];
        setClickedCards(prevState => [...prevState, card]);
        newCards[index].isVisible = true;
        setCards(newCards);
    }

    return (
        <div className={"cards " + (cardsDisabled ? "disabled" : "")}>
            {cards.map((card, index) => {
                return (
                    <Card key={index} card={card} handleToggleShowCard={() => handleToggleShowCard(card.id)} />
                )
            })}
        </div>
    );
};

export default Cards;