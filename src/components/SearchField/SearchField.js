import React from "react";
import PropTypes from "prop-types";

/**
 * A SearchField that passes any changes in text through the function registered by the onChange prop.
 */
export default function SearchField(props) {
    return (
        <div>
            <input type="text" onChange={evt => props.onChange(evt.target.value)}></input>
        </div>
    );
}

SearchField.propTypes = {
    onChange: PropTypes.func.isRequired
};