import React from "react";
import PropTypes from "prop-types";

import styles from "./Card.module.css";

export default function Card(props) {
    var categories = props.card.categories.join(", ");

    return (
        <section>
            <div className={styles.card}>

                {props.card.imageUri && <div className={styles.card_image}><img src={props.card.imageUri} loading="lazy"/></div>}

                <div className={styles.card_text}>
                    <div className={styles.categories}>{categories}</div>

                    <div className={styles.title}>{props.card.title}</div>

                    <div className={styles.experts}>
                        {props.card.experts.map(expert => (
                            <div key={expert.name}>
                                <div>{expert.name}</div>
                                <div>{expert.title}</div>
                                <div className={styles.experts_company}>{expert.company}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

Card.propTypes = {
    card: PropTypes.object
};