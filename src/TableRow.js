import React from 'react';
import ShortDefinition from './ShortDefinition.js';
import FullDefinition from './FullDefinition.js';

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word: props.value.word,
            meanings: props.value.meanings,
            date: props.value.date,
            active: false
        } 
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        });
    }

    renderDefinition() {
        if(this.state.active) {
            return <FullDefinition value={this.state.meanings} />
        } else {
            return <ShortDefinition value={this.state.meanings[0]} />
        }
    }

    render() {
        const readableDate = this.state.date.toJSON().substring(0, 10);
        return (
            <tr onClick={() => this.handleClick()}>
                <td className="small-column">{this.state.word}</td>
                <td className="large-column">{this.renderDefinition()}</td>
                <td className="small-column">{readableDate}</td>
            </tr>
        );
    }
}

export default TableRow;