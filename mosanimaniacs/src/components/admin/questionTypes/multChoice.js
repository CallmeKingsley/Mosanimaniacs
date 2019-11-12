import React, { Component } from "react";
import '../../../css/Welcome.css';

class MultipleChoice extends Component {
    render() {
        return (
            <>
                <input type="text" name="questionTitle" id="questionTitle" placeholder="Question"/>
                <input type="text" name="answerChoiceA" id="answerChoiceA" placeholder="Answer Choice"/>
                <input type="text" name="answerChoiceB" id="answerChoiceB" placeholder="Answer Choice"/>
                <input type="text" name="answerChoiceC" id="answerChoiceC" placeholder="Answer Choice"/>
                <input type="text" name="answerChoiceD" id="answerChoiceD" placeholder="Answer Choice"/>
            </>
        )
    }
}

export default MultipleChoice;