import React, { Component } from "react";
import '../../../css/Welcome.css';

class CircuitForm extends Component {
    render() {
        return (
            <div>
                <label htmlFor="circuitType">Select Circuit Type:</label>
                <select id="circuitType">
                    <option value="fill-in-blank">Series</option>
                    <option value="multiple-choice">Parallel</option>
                    {/* Add more options here and have image previews */}
                </select>
                <button className="save">Save</button>
                <button className="delete">Delete</button>
                <br/>
            </div>
        )
    }
}

export default CircuitForm;