import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlankQuestion extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.question = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditQuestion = this.handleEditQuestion.bind(this);
        this.answer = React.createRef();
        this.state = {
            isEdit: false,
            type: "fill-in-blank",
            Question: "",
            correctAnswer: "",
            index: 0,
            Attempted: false,
            Correct: null
        }
    }

    componentDidMount() {
        const { index, question, answer } = this.props;
        this.setState({
            question,
            correctAnswer: answer,
            index
        })
    }

    handleEdit() {
        this.setState({isEdit: true});
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        this.setState({
            isEdit: false,
            question: this.question.current.value,
            correctAnswer: this.answer.current.value,
        },() => {
            this.props.updateQuestion(this.state);
        });
    }

    handleEditQuestion(e) {
        e.preventDefault();
        e.persist();
        let newQuestion;
        let newAnswer;
        switch(e.target.name) {
            case "questionTitle":
                newQuestion = e.target.value;
                break;
            case "correctAnswer":
                newAnswer = e.target.value;
                break;
            default: 
                break;
        }
        this.setState({
            question: newQuestion,
            correctAnswer: newAnswer
        })
    }

    render() {
        const { question, correctAnswer, isEdit } = this.state;
        const { className, deleteQuestion } = this.props;
        return (
            <>
            {(() => {
                if (isEdit) {
                    return <form onSubmit={this.handleSubmitQuestion}>
                    <fieldset>
                        <div>
                            <input type="text" name="questionTitle" ref={this.question} 
                            className="questionTitle" onChange={this.handleEditQuestion}
                            placeholder="Question" defaultValue={question}/>
    
                            <input type="text" name="correctAnswer" ref={this.answer}
                            className="correctAnswer" onChange={this.handleEditQuestion}
                            placeholder="Correct Answer" defaultValue={correctAnswer}/>
    
                            <button type="submit" className="save">Save</button>
                            <button className="delete" onClick={() => deleteQuestion(this.state)}>Delete</button>
                            <br/>
                        </div>
                    </fieldset>
                </form>
                } else {
                    return  <div className={className}>
                                <p><strong>Question:</strong>{question}</p>
                                <p><strong>Answer:</strong>{correctAnswer}</p>
                                <button onClick={this.handleEdit}>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
                                <button className="delete" onClick={() => deleteQuestion(this.state)}>
                                    Delete<i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
    
                }
            })()}
            </>

        )
    }
}

export default FillBlankQuestion;