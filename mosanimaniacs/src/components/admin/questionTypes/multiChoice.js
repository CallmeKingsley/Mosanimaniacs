import React, { Component } from "react";
import '../../../css/createQuiz.css';

class MultipleChoiceQuestion extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.form = React.createRef();
        this.data = {};
        this.state = {
            type: "multiple-choice",
            question: '',
            answerChoices: [],
            correctAnswer: '',
            isEdit: false,
            index: 0
          };
    }

    componentDidMount() {
        const { className, index, theQuestion, theAnswerChoices, theCorrectAnswer } = this.props;
        this.setState({
            question: theQuestion,
            answerChoices: theAnswerChoices,
            correctAnswer: theCorrectAnswer,
            index
        })
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
            isEdit: false,
            question: inputs.questionTitle.value,
            answerChoices: answerChoices,
            correctAnswer: answerChoices.reduce((acc,el,i) => {
                if (i === this.state.correctAnswer) {
                    return el;
                }
            },"")
        }, () => {
            console.log(this.state);
            this.props.updateQuestion(this.state);
        });
    }

    handleCorrectAnswer(e) {
        this.setState({correctAnswer: parseInt(e.target.id)});
    }

    handleEdit() {
        console.log(this.state.answerChoices);
        this.setState({isEdit: true});
    }

    render() {
        const { question, answerChoices, isEdit } = this.state;
        const { className, theQuestion, theAnswerChoices, theCorrectAnswer } = this.props;
        return (
            <>
            {(() => {
                if (isEdit) {
                    return <form onSubmit={this.handleSubmitQuestion} ref={this.form}>
                    <div>
                        <input type="text" name="questionTitle" className="questionTitle" placeholder="Question" placeholder={question}/>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Answer Choice</th>
                                    <th>Correct Answer?</th>
                                </tr>
                                {/* <tr>
                                    <td><input type="text" name="answerChoice0" className="answerChoice0"/></td>
                                    <td><input type="radio" id="0" onChange={this.handleCorrectAnswer} name="correctAnswer" value={theAnswerChoices[0]}/></td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="answerChoice1" className="answerChoice1"/></td>
                                    <td><input type="radio" id="1" onChange={this.handleCorrectAnswer} name="correctAnswer" value={theAnswerChoices[1]}/></td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="answerChoice2" className="answerChoice2"/></td>
                                    <td><input type="radio" id="2" onChange={this.handleCorrectAnswer} name="correctAnswer" value={theAnswerChoices[2]}/></td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="answerChoice3" className="answerChoice3"/></td>
                                    <td><input type="radio" id="3" onChange={this.handleCorrectAnswer} name="correctAnswer" value={theAnswerChoices[3]}/></td>
                                </tr> */}
                                {answerChoices.map((answerChoice,index) => {
                                    return  <tr>
                                                <td><input type="text" name={`answerChoice${index}`} className={`answerChoice${index}`} placeholder={answerChoice}/></td>
                                                <td><input type="radio" id={index} onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice}/></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                        <button className="save">Save</button>
                        <button className="delete">Delete</button>
                        <br/>
                    </div>
                </form>
                } else {
                    return  <div className={className}>
                                <p><strong>Question</strong>: {theQuestion}</p>
                                <p><strong>Answer Choices</strong>:</p>
                                <ul>
                                    {theAnswerChoices.map((answer,index) => <li key={index}>{answer}</li>)}
                                </ul>
                                <p><strong>Correct Answer</strong>: {theCorrectAnswer}</p>
                                <button onClick={this.handleEdit}>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
                            </div>    
                }
            })()}
            </>
        )
    }
}

export default MultipleChoiceQuestion;