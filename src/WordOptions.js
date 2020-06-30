import React from 'react';

const WordOptions = (props) => {
    if(!props.active) {
        return <></>;
    }

    return (
        <tr>
            <td colspan="3">
                More definitions
            </td>
        </tr>
    );
}

export default WordOptions;