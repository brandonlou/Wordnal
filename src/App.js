/* global browser */
// This tells ESLint to ignore the browser keyword since it is only available in the
// extension's scope ^

import React from 'react';
import Table from './Table.js';
import Title from './Title.js';
import SortDropdown from './SortDropdown.js';
import SettingsButton from './SettingsButton.js';
import AddWordModal from './AddWordModal.js';
import './App.css';

class App extends React.Component {

    // Initialize initial state (stores all the words, etc.)
    constructor() {
        super();
        this.state = {
            words: [],
            options: {},
            addWordActive: false
        };
        this.handleStorageChange = this.handleStorageChange.bind(this);
    }

    componentDidMount() {
        this.retrieveWords();
        this.retrieveOptions();
        browser.storage.onChanged.addListener(this.handleStorageChange);
    }

    componentWillUnmount() {
        browser.storage.onChanged.removeListener(this.handleStorageChange);
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
            this.setState({
                words: result.words
            });
        });
    }

    // Updates component state whenever a change to browser storage is detected.
    handleStorageChange(changes, area) {
        if(changes.words != undefined) {
            const newWords = changes.words.newValue;
            this.setState({
                words: newWords
            });
        }
    }

    handleClick() {
        const modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    render() {
        return (
            <div className="App">
                <Title className="AppTitle" value={this.state.options.name} />
                <div className="AppOptions">
                    <SortDropdown className="AppSortDropdown" />
                    <button onClick={() => this.handleClick()}>Add Word</button>
                    <SettingsButton className="AppSettingsButton" />
                </div>
                <Table className="AppTable" value={this.state.words} />
                <AddWordModal />
            </div>
        );
    }

}

export default App;