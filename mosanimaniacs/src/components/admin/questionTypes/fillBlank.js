import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlankForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.question = React.createRef();
        this.answer = React.createRef();
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        let stuff = [this.question.current.value,this.answer.current.value];
        let otherStuff = {
            type: "fill-in-blank",
            question: this.question.current.value,
            answer: this.answer.current.value
        };
        // let res = this.stringifyFormData(otherStuff);
        this.props.updateQuiz(otherStuff);
    }

    render() {
        const { className, key, question, answer } = this.props;
        return (
            <form onSubmit={this.handleSubmitQuestion}>
                {/* <div className={el.type} key={i}><p><strong>Question:</strong>{el.question}</p>
                                <p><strong>Answer:</strong>{el.answer}</p>
                                <button>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button></div> */}
                <fieldset>
                    <div>
                        <input type="text" name="questionTitle" ref={this.question} 
                        className="questionTitle" placeholder="Question"/>

                        <input type="text" name="correctAnswer" ref={this.answer}
                        className="correctAnswer" placeholder="Correct Answer"/>

                        <button type="submit" className="save">Save</button>
                        <button className="delete">Delete</button>
                        <br/>
                    </div>
                </fieldset>
                {/* <button type="submit">Save</button> */}
            </form>
        )
    }
}

export default FillBlankForm;