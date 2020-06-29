import React from 'react';

class SortDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "new"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        }, () => {
            console.log(this.state.value);
        });
    }

    render() {
        return (
            <form>
                <label>
                    Sort by:&nbsp;
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="new">New</option>
                        <option value="old">Old</option>
                        <option value="a-z">A-Z</option>
                    </select>
                </label>
            </form>
        );
    }

}

export default SortDropdown;