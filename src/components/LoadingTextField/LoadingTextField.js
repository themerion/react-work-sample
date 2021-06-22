import React from "react";
import PropTypes from "prop-types";

import styles from "./LoadingTextField.module.css";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/**
 * A TextField that passes any changes in text through the function registered by the "onChange" prop.
 * Shows a loading indicator if the prop "isLoading" is true
 */
export default function LoadingTextField(props) {
    return (
        <div className={styles.container}>
            <input className={styles.textfield} type="text" onChange={evt => props.onChange(evt.target.value)}></input>
            {props.isLoading && <div className={styles.loader}>
                <div className={styles.loader_innerContainer}>
                    <Loader type="Puff" color="#989898" height={25} width={25} />
                </div>
            </div>}
        </div>
    );
}

LoadingTextField.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};