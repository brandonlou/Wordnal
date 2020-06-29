import React from 'react';

const ShortDefinition = (props) => {
    return (
        <span>
            <span className="part-of-speech">{props.value.part_of_speech}</span> <span className="meaning">{props.value.definition}</span>
        </span>
    );
}

export default ShortDefinition;