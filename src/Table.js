import React from 'react';
import WordOptions from './WordOptions.js';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    renderDefinition(meanings) {
        const word = meanings[0];
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

    // Takes a Date object and returns the date in a human readable form in some ISO standard.
    renderDate(date) {
        const readableDate = date.toJSON().substring(0, 10);
        return readableDate;
    }

    // Makes the WordOptions under each word row visible or hidden.
    handleRowClick(word) {

        // TODO: Close all current wordOptions
        
        const wordOptions = document.getElementById(word + "-options");
        const styles = window.getComputedStyle(wordOptions);
        const visibility = styles.getPropertyValue("visibility");
        wordOptions.style.visibility = (visibility == "visible") ? "collapse" : "visible";
    }

    renderRow(item, i) {
        return (
            <React.Fragment>
                <tr onClick={() => this.handleRowClick(item.word)}>
                    <td className="small-column">{item.word}</td>
                    <td className="large-column">{this.renderDefinition(item.meanings)}</td>
                    <td className="small-column">{this.renderDate(item.date)}</td>
                </tr>
                <WordOptions value={item.word} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <table>
                <tr>
                    <th>Word</th>
                    <th>Definition</th>
                    <th>Date Added</th>
                </tr>
                {this.props.value.map((item, i) => this.renderRow(item, i))}
            </table>
        );
    }
}

export default Table;