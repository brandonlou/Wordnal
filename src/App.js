import React from 'react';
import Table from './Table.js';
import Title from './Title.js';
import SortDropdown from './SortDropdown.js';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Title className="AppTitle" />
            <SortDropdown className="AppSortDropdown" />
            <Table className="AppTable" />
        </div>
    );
}

export default App
