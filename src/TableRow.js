import React from 'react';
import WordOptions from './WordOptions.js';

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word: props.value.word,
            meanings: props.value.meanings,
            date: props.value.date,
            active: false
        };
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        });
    }

    renderDefinition() {
        const word = this.state.meanings[0];
        let partOfSpeech = "";
        let definition = "";
        if(word != undefined) {
            partOfSpeech = word.part_of_speech;
            definition = word.definition;
        }
        return (
            <React.Fragment>
                <span className="part-of-speech">{partOfSpeech}</span>&nbsp;
                <span className="meaning">{definition}</span>
            </React.Fragment>
        );
    }

    renderDate() {
        const readableDate = this.state.date.toJSON().substring(0, 10);
        return (
            <span>{readableDate}</span>
        );
    }

    render() {
        return (
            <React.Fragment>
                <tr onClick={() => this.handleClick()}>
                    <td className="small-column">{this.state.word}</td>
                    <td className="large-column">{this.renderDefinition()}</td>
                    <td className="small-column">{this.renderDate()}</td>
                </tr>
                <WordOptions active={this.state.active} />
            </React.Fragment>
        );
    }
}

export default TableRow;