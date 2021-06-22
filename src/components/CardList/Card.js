import React from "react";
import PropTypes from "prop-types";

export default function Card(props) {
    var categories = props.card.categories.join(", ");

    return (
        <section>
            <div>
                {props.card.imageUri && <div><img src={props.card.imageUri} loading="lazy"/></div>}
                <div>{categories}</div>
                <div>{props.card.title}</div>
                <div>
                    {props.card.experts.map(expert => (
                        <div key={expert.name}>
                            <div>{expert.name}</div>
                            <div>{expert.title}</div>
                            <div>{expert.company}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

Card.propTypes = {
    card: PropTypes.object
};