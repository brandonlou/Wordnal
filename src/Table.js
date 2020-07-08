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
                <span className="part-of-speech">{partOfSpeech}</span>
                &nbsp;&nbsp;
                <span className="meaning">{definition}</span>
            </React.Fragment>
        );
    }

    // Takes a Date object and returns the date in a human readable form in some ISO standard.
    renderDate(date) {
        const readableDate = date.toJSON().substring(0, 10);
        return (
            <span>{readableDate}</span>
        );
    }

    // Makes the word options under each word row visible or hidden.
    handleRowClick(event, word) {

        // Background of the row clicked, not the text.
        if(event.target.tagName != "TD") {
            return;
        }

        // Get selected word option.
        const selectedWordOption = document.getElementById(word + "-options");
        const styles = window.getComputedStyle(selectedWordOption);
        const visibility = styles.getPropertyValue("display");

        // Close all word options.
        const allWordOptions = document.getElementsByClassName("WordOptions");
        for(const element of allWordOptions) {
            element.style.display = "none";
        }

        // Make selected word option visible if previously hidden.
        if(visibility == "none") {
            selectedWordOption.style.display = "table-row";
        }

    }

    renderRow(item, i) {
        return (
            <React.Fragment>
                <tr onClick={(event) => this.handleRowClick(event, item.word)} className="WordRow">
                    <td className="small-column">
                        <span>{item.word}</span>
                    </td>
                    <td className="large-column">
                        {this.renderDefinition(item.meanings)}
                    </td>
                    <td className="small-column">
                        {this.renderDate(item.date)}
                    </td>
                </tr>
                <WordOptions value={item.word} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <table>
                <tr className="TableHeader">
                    <th>Word</th>
                    <th>Definition</th>
                    <th>Date Added</th>
                </tr>
                {this.props.value && this.props.value.map((item, i) => this.renderRow(item, i))}
            </table>
        );
    }
}

export default Table;