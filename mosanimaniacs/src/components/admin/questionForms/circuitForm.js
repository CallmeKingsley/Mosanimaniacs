import React, { Component } from "react";
import '../../../css/Welcome.css';
import '../../../css/createQuiz.css';

class CircuitForm extends Component {

    constructor(props) {
        super(props);

        this.showCircuitDrawing = this.showCircuitDrawing.bind(this);
        this.circuitOption = React.createRef();
        this.circuitDrawing = React.createRef();
    }

    showCircuitDrawing(e) {
        e.preventDefaul();
        e.persist();
        this.circuitDrawing.style.display = "block";
    }

    render() {
        return (
            <div className="circuitQuestionForm">
                <label htmlFor="circuitType">Select Circuit Type:</label>
                <select id="circuitType" ref={this.circuitOption}>
                    <option value="series" className="circuitOption">
                        Series
                    </option>
                    {/* Add more options here and have image previews */}
                </select>
                <div className="circuitImage" ref={this.circuitDrawing}>
                    {/* This contains a drawing of a simple circuit */}
                </div>
                <button className="save">Save</button>
                <button className="delete">Delete</button>
                <br/>
            </div>
        )
    }
}

export default CircuitForm;