import React from 'react';
import ShortDefinition from './ShortDefinition.js';
import FullDefinition from './FullDefinition.js';

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word: props.value.word,
            shortDef: props.value.shortDef,
            fullDef: props.value.fullDef,
            date: props.value.date,
            active: false
        } 
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        });
        console.log("clicked!");
    }

    renderDefinition() {
        if(this.state.active) {
            return <FullDefinition value={this.state.fullDef} />
        } else {
            return <ShortDefinition value={this.state.shortDef} />
        }
    }

    render() {
        return (
            <tr onClick={() => this.handleClick()}>
                <td className="small-column">{this.state.word}</td>
                <td className="large-column">{this.renderDefinition()}</td>
                <td className="small-column">{this.state.date}</td>
            </tr>
        );
    }
}

export default TableRow;