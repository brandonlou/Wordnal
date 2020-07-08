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

        // Close all word options.
        const allWordOptions = document.getElementsByClassName("WordOptions");
        for(const element of allWordOptions) {
            element.style.display = "none";
        }

        browser.storage.local.get("words", (result) => {
            if(result.words == undefined) {
                return;
            }
            let allWords = result.words;

            // Sort the words accordingly.
            switch(sortBy) {
                case "new":
                    allWords = this.newestSortWords(allWords);
                    break;
                case "old":
                    allWords = this.oldestSortWords(allWords);
                    break;
                case "a-z":
                    allWords = this.alphaSortWords(allWords);
                    break;
                case "random":
                    allWords = this.randomSortWords(allWords);
                    break;
                default:
                    break;
            }

            // Store sorted words.
            browser.storage.local.set({
                words: allWords
            });

            // Update state last because some sorting algorithms take into account of previous
            // sorting method for optimization.
            this.setState({
                value: sortBy
            });

        });
    }

    // Sort an array of word objects from newest to oldest.
    newestSortWords(allWords) {

        // If previous sort was by old, simply reverse the array.
        if(this.state.value == "old") {
            return allWords.reverse();
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

        return allWords;

    }

    // Sort an array of word objects from oldest to newest.
    oldestSortWords(allWords) {

        // If previous sort was by new, simply reverse the array.
        if(this.state.value == "new") {
            return allWords.reverse();
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

        return allWords;
    }

    // Sort an array of word objects alphabetically.
    alphaSortWords(allWords) {
        allWords.sort((a, b) => {
            return a.word.localeCompare(b.word);
        });
        return allWords;
    }

    // Sort an array of word objects randomly using Durstenfeld shuffle (optimized version of Fisher-Yates).
    randomSortWords(allWords) {
        let currentIndex = allWords.length - 1;

        // Go through all words.
        for(; currentIndex > 0; --currentIndex) {

            // Select random word.
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

            // Swap current word with random word.
            [allWords[currentIndex], allWords[randomIndex]] = [allWords[randomIndex], allWords[currentIndex]];
        }

        return allWords;
    }

    render() {
        return (
            <form>
                <label>
                    Sort by &nbsp;&nbsp;
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