import React from 'react';

const ShortDefinition = (props) => {
    let partOfSpeech = "";
    let definition = "";
    if(props.value != undefined) {
        partOfSpeech = props.value.part_of_speech;
        definition = props.value.definition;
    }
    return (
        <span>
            <span className="part-of-speech">{partOfSpeech}</span> <span className="meaning">{definition}</span>
        </span>
    );
}

export default ShortDefinition;