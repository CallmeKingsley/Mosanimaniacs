import React, { Component } from "react";
import '../../../css/createQuiz.css';

class MultipleChoice extends Component {

    render() {
        const { index } = this.props;
        return (
            <>
                <input type="text" name={`questionTitle-${index}`} class={`questionTitle-${index}`} placeholder="Question"/>
                <table>
                    <tbody>
                        <tr>
                            <th>Answer Choice</th>
                            <th>Correct Answer?</th>
                        </tr>
                        <tr>
                            <td><input type="text" name={`answerChoiceA-${index}`} className={`answerChoiceA-${index}`}/></td>
                            <td><input type="radio" name={`correctAnswer-${index}`} value="A"/></td>
                        </tr>
                        <tr>
                            <td><input type="text" name={`answerChoiceB-${index}`} className={`answerChoiceB-${index}`}/></td>
                            <td><input type="radio" name={`correctAnswer-${index}`} value="B"/></td>
                        </tr>
                        <tr>
                            <td><input type="text" name={`answerChoiceC-${index}`} className={`answerChoiceC-${index}`}/></td>
                            <td><input type="radio" name={`correctAnswer-${index}`} value="C"/></td>
                        </tr>
                        <tr>
                            <td><input type="text" name={`answerChoiceD-${index}`} className={`answerChoiceD-${index}`}/></td>
                            <td><input type="radio" name={`correctAnswer-${index}`} value="D"/></td>
                        </tr>
                    </tbody>
                </table>
                <button className="save">Save</button>
                <button className="delete">Delete</button>
                <br/>
            </>
        )
    }
}

export default MultipleChoice;