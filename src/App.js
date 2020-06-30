/* global browser */
// This tells ESLint to ignore the browser keyword since it is only available in the
// extension's scope ^

import React from 'react';
import Table from './Table.js';
import Title from './Title.js';
import SortDropdown from './SortDropdown.js';
import SettingsButton from './SettingsButton.js';
import './App.css';

class App extends React.Component {

    // Initialize initial state (stores all the words, etc.)
    constructor() {
        super();
        this.state = {
            words: [],
            options: {}
        };
    }

    componentDidMount() {
        this.retrieveWords();
        this.retrieveOptions();
    }

    retrieveOptions() {
        browser.storage.local.get("options", (result) => {
            let storedOptions = result.options;
            if(storedOptions == undefined) {
                storedOptions = {
                    name: "My",
                    color: "#ffffff",
                    notifications: "on"
                }
            }
            this.setState({
                options: storedOptions
            });
        });
    }

    // Retrieve stored words into state.
    retrieveWords() {
        browser.storage.local.get("words", (result) => {
            result.words.forEach((value) => {
                this.setState({
                    words: [...this.state.words, {
                        word: value.word,
                        meanings: value.meanings,
                        date: value.date
                    }]
                });
            });
        });
    }

    render() {
        return (
            <div className="App">
                <Title className="AppTitle" value={this.state.options.name} />
                <div className="AppOptions">
                    <SortDropdown className="AppSortDropdown" />
                    <SettingsButton className="AppSettingsButton" />
                </div>
                <Table className="AppTable" value={this.state.words} />
            </div>
        );
    }

}

export default App;