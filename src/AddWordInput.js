import React from 'react';

const AddWordInput = (props) => {
    if(!props.active) {
        return <></>;
    }
    return (
        <p>
            Another blah
        </p>
    );
}

export default AddWordInput;