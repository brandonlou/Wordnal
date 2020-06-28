import React from 'react';

const SortDropdown = () => {
    return (
        <form>
            <label for="sortingMethod">Sort by: </label>
            <select name="sortingMethod" id="sortingMethod">
                <option value="new">New</option>
                <option value="old">Old</option>
                <option value="a-z">A-Z</option>
            </select>
        </form>
    );
}

export default SortDropdown;