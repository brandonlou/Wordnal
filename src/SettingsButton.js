/* global browser */

import React from 'react';

class SettingsButton extends React.Component {

    handleClick() {
        browser.runtime.openOptionsPage()
            .then(() => {
                console.log("Opened settings page!");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Settings
            </button>
        );
    }

}

export default SettingsButton;