import React from 'react';
import Table from './Table.js';
import Title from './Title.js';
import SortDropdown from './SortDropdown.js';
import SettingsButton from './SettingsButton.js';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Title className="AppTitle" />
            <div className="AppOptions">
                <SortDropdown className="AppSortDropdown" />
                <SettingsButton className="AppSettingsButton" />
            </div>
            <Table className="AppTable" />
        </div>
    );
}

export default App;