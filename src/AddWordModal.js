/* global browser */

import React from 'react';

class AddWordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newWord: "",
            newPoS: "",
            newDefinition: ""
        }
    }

    // Cleares the input boxes by setting their state to an empty string.
    clearInputBoxes() {
        this.setState({
            newWord: "",
            newPoS: "",
            newDefinition: ""
        });
    }

    // Closes modal if user clicks the background of the modal.
    handleBackgroundClick(e) {
        if(e.target.className == "modal") {
            e.target.style.display = "none";
            this.clearInputBoxes();
        }
    }

    // Closes modal if user clicks close button.
    handleCloseClick() {
        document.getElementById("modal").style.display = "none";
        this.clearInputBoxes();
    }

    // Updates state according to the values in the text boxes.
    handleChange(event, property) {
        this.setState({
            [property]: event.target.value
        });
    }

    // Sends a message to the background script to add new word. Then closes modal.
    handleAddClick(event) {
        event.preventDefault();
        browser.runtime.sendMessage({
            newWord: this.state.newWord,
            newPoS: this.state.newPoS,
            newDefinition: this.state.newDefinition
        });
        this.handleCloseClick();
    }

    render() {
        return (
            <div id="modal" className="modal" onClick={(e) => this.handleBackgroundClick(e)}>
                <div className="modal-content">
                    <span className="close-modal" onClick={() => this.handleCloseClick()}>
                        &times;
                    </span>
                    <h3>Add Word</h3>
                    <hr />
                    <form className="add-word-form">
                        <div>
                            <label>Word*</label>
                            <input type="text" value={this.state.newWord} onChange={(e) => this.handleChange(e, "newWord")}></input>
                        </div>
                        <div>
                            <label>Part of Speech</label>
                            <input type="text" value={this.state.newPoS} onChange={(e) => this.handleChange(e, "newPoS")}></input>
                        </div>
                        <div>
                            <label>Definition</label>
                            <input type="text" value={this.state.newDefinition} onChange={(e) => this.handleChange(e, "newDefinition")}></input>
                        </div>
                        <div>
                            <button onClick={(e) => this.handleAddClick(e)} type="submit">Add Word</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default AddWordModal;