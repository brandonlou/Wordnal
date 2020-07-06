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

    handleBackgroundClick(e) {
        // Only close modal if background has been clicked and not the content.
        if(e.target.className == "modal") {
            e.target.style.display = "none";
        }
    }

    handleCloseClick() {
        const thisModal = document.getElementById("modal");
        thisModal.style.display = "none";
    }

    handleChange(event, property) {
        this.setState({
            [property]: event.target.value
        });
    }

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
            <div id="modal" className="modal" onClick={this.handleBackgroundClick}>
                <div className="modal-content">
                    <span className="close-modal" onClick={this.handleCloseClick}>
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