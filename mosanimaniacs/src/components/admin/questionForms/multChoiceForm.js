import React, { Component } from "react";
import '../../../css/createQuiz.css';

class MultipleChoiceForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.form = React.createRef();
        this.data = {};
        this.state = {
            type: "multiple-choice",
            question: '',
            answerChoices: [],
            correctAnswer: '',
            index: this.props.length,
            Attempted: false,
            Correct: null
          };
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        e.persist();
        const inputs = e.target.getElementsByTagName('input');
        const answerChoices = [
            inputs.answerChoice0.value,
            inputs.answerChoice1.value,
            inputs.answerChoice2.value,
            inputs.answerChoice3.value
        ];
        this.setState({
            question: inputs.questionTitle.value,
            answerChoices: answerChoices,
            correctAnswer: answerChoices.reduce((acc,el,i) => {
                if (i === this.state.correctAnswer) {
                    return el;
                }
            },"")
        }, () => {
            this.props.updateQuiz(this.state);
        });
    }

    handleCorrectAnswer(e) {
        this.setState({correctAnswer: parseInt(e.target.id)});
    }

    render() {
        const { answerChoice0, answerChoice1, answerChoice2, answerChoice3 } = this.state;
        return (
            <form onSubmit={this.handleSubmitQuestion} ref={this.form}>
                <div>
                    <input type="text" name="questionTitle" className="questionTitle" placeholder="Question"/>
                    <table>
                        <tbody>
                            <tr>
                                <th>Answer Choice</th>
                                <th>Correct Answer?</th>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice0" className="answerChoice0"/></td>
                                <td><input type="radio" id="0" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice0}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice1" className="answerChoice1"/></td>
                                <td><input type="radio" id="1" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice1}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice2" className="answerChoice2"/></td>
                                <td><input type="radio" id="2" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice2}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice3" className="answerChoice3"/></td>
                                <td><input type="radio" id="3" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice3}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="save">Save</button>
                    <button className="delete">Delete</button>
                    <br/>
                </div>
            </form>
        )
    }
}

export default MultipleChoiceForm;