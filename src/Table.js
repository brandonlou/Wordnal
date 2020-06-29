import React from 'react';
import TableRow from './TableRow.js';

const Table = (props) => {    
    return (
        <table>
            <tr>
                <th>Word</th>
                <th>Definition</th>
                <th>Date Added</th>
            </tr>
            {props.value.map(row => (
                <TableRow value={row}/>
            ))}
        </table>
    );
}

export default Table;