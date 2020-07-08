/* global browser */

import React from 'react';

class WordOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    delete() {
        // Get current stored words.
        browser.storage.local.get("words", (results) => {
            let allWords = results.words;
            for(const wordObject of allWords) {

                // Found word to delete in stored words.
                if(wordObject.word == this.props.value) {

                    // Hide the word options.
                    document.getElementById(this.props.value + "-options").style.visibility = "collapse";

                    // Get index of word to delete and remove it from array.
                    const index = allWords.indexOf(wordObject);
                    if(index > -1) {
                        allWords.splice(index, 1);
                    }

                    // Update stored list of words.
                    browser.storage.local.set({
                        words: allWords
                    });
                    break;
                }
            }
        });
    }

    render() {
        const word = this.props.value;
        return (
            <tr id={word + "-options"} className="WordOptions">
                <td colspan="3">
                    More definitions...
                    <button onClick={}>Edit</button>
                    <button onClick={() => this.delete()}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default WordOptions;