import React from 'react';

const WordOptions = (props) => {
    if(props.active) {
        return (
            <tr>
                <td colspan="3">
                    Blah
                </td>
            </tr>
        );
    } else {
        return <></>;
    }
}

export default WordOptions;