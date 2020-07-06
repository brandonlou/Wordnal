/* global browser */

import React from 'react';

class SortDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "new"
        };
    }

    handleChange(event) {
        const sortBy = event.target.value;
        this.setState({
            value: sortBy
        });
        switch(sortBy) {
            case "new":
                this.newestSortWords();
                break;
            case "old":
                this.oldestSortWords();
                break;
            case "a-z":
                this.alphaSortWords();
                break;
            case "random":
                this.randomSortWords();
                break;
            default:
                break;
        }
    }

    newestSortWords() {
        browser.storage.local.get("words", (result) => {
            const allWords = result.words;
            if(result.words == undefined) {
                return;
            }
            allWords.sort((a, b) => {
                if(a.date > b.date) {
                    return -1;
                } else if(a.date < b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
            browser.storage.local.set({
                words: allWords
            });
        });
    }

    oldestSortWords() {
        browser.storage.local.get("words", (result) => {
            const allWords = result.words;
            if(result.words == undefined) {
                return;
            }
            allWords.sort((a, b) => {
                if(a.date < b.date) {
                    return -1;
                } else if(a.date > b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
            browser.storage.local.set({
                words: allWords
            });
        });
    }

    alphaSortWords() {
        browser.storage.local.get("words", (result) => {
            const allWords = result.words;
            if(result.words == undefined) {
                return;
            }
            allWords.sort((a, b) => {
                return a.word.localeCompare(b.word);
            });

            // Save alphabetical ordering of words.
            browser.storage.local.set({
                words: allWords
            });
        });
    }

    randomSortWords() {
        browser.storage.local.get("words", (result) => {
            const allWords = result.words;
            if(result.words == undefined) {
                return;
            }
            let currentIndex = allWords.length - 1;
            // Go through all words.
            for(; currentIndex > 0; currentIndex--) {
                // Select random word.
                const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
                // Swap current word with random word.
                [allWords[currentIndex], allWords[randomIndex]] = [allWords[randomIndex], allWords[currentIndex]];
            }
            
            // Save randomized ordering of words.
            browser.storage.local.set({
                words: allWords
            });

        });
    }

    render() {
        return (
            <form>
                <label>
                    Sort by:&nbsp;
                    <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                        <option value="new">New</option>
                        <option value="old">Old</option>
                        <option value="a-z">A-Z</option>
                        <option value="random">Random</option>
                    </select>
                </label>
            </form>
        );
    }

}

export default SortDropdown;