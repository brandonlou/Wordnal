/* global browser */

import React from 'react';
import TableRow from './TableRow.js';

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        browser.storage.local.get(null, (storedWords) => {
            for(let [key, value] of Object.entries(storedWords)) {
                this.setState({
                    data: [...this.state.data, {
                        word: key,
                        shortDef: value.shortDef,
                        fullDef: value.fullDef,
                        date: value.date
                    }]
                });
            }
        });
    }

    render() {
        return (
            <table>
                <tr>
                    <th>Word</th>
                    <th>Definition</th>
                    <th>Date Added</th>
                </tr>
                {this.state.data.map(row => (
                    <TableRow value={row}/>
                ))}
            </table>
        );
    }
}

export default Table;