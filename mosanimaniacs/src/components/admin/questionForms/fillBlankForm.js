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
            correctAnswer: this.answer.current.value,
            index: this.props.length,
            Attempted: false,
            Correct: null
        };
        this.props.updateQuiz(otherStuff);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitQuestion}>
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