import React from 'react';

class AddWordModal extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div id="modal" className="modal" onClick={this.handleBackgroundClick}>
                <div className="modal-content">
                    <span className="close-modal" onClick={this.handleCloseClick}>
                        &times;
                    </span>
                    <h3>Add Word</h3>
                    <hr />
                    <label>
                        Word*
                        <input type="text"></input>
                    </label>
                    <br/><br/>
                    <label>
                        Part of Speech
                        <input type="text"></input>
                    </label>
                    <br/><br/>
                    <label>
                        Definition
                        <input type="text"></input>
                    </label>
                    <br/><br/>
                    <p>
                        *Required.
                    </p>
                    <button type="submit">Add Word</button>
                </div>
            </div>
        );
    }

}

export default AddWordModal;