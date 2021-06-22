import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

export default function CardList(props) {
    return (
        <div>
            {props.cards.map(card =>
                <Card key={card.title} card={card}/>
            )}
        </div>
    );
}

CardList.propTypes = {
    cards: PropTypes.array.isRequired
};