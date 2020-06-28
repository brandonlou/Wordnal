import React from 'react';

const ShortDefinition = (props) => {
    return (
        <span>
            <span className="part-of-speech">{props.value.partOfSpeech}</span> <span className="meaning">{props.value.meaning}</span>
        </span>
    );
}

export default ShortDefinition;