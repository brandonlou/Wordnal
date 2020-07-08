import React from 'react';

const TableFooter = (props) => {
    return (
        <tr className="TableFooter">
            <td colSpan="3">
                Total words: {props.value}
            </td>
        </tr>
    );
}

export default TableFooter;