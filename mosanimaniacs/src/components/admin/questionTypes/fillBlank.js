import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlank extends Component {
    render() {
        return (
            <>
                <input type="text" name="questionTitle" id="questionTitle" placeholder="Question"/>
                <input type="text" name="correctAnswer" id="correctAnswer" placeholder="Correct Answer"/>
                <button className="save">Save</button>
                <button className="delete">Delete</button>
                <br/>
            </>
        )
    }
}

export default FillBlank;