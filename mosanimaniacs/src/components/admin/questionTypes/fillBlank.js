import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlankQuestion extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.question = React.createRef();
        this.answer = React.createRef();
        this.state = {
            isEdit: false
        }
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
            // <form onSubmit={this.handleSubmitQuestion}>
            //     <fieldset>
            //         <div>
            //             <input type="text" name="questionTitle" ref={this.question} 
            //             className="questionTitle" placeholder="Question"/>

            //             <input type="text" name="correctAnswer" ref={this.answer}
            //             className="correctAnswer" placeholder="Correct Answer"/>

            //             <button type="submit" className="save">Save</button>
            //             <button className="delete">Delete</button>
            //             <br/>
            //         </div>
            //     </fieldset>
            // </form>
            <div className={className} key={key}>
                <p><strong>Question:</strong>{question}</p>
                <p><strong>Answer:</strong>{answer}</p>
            <button>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button></div>

        )
    }
}

export default FillBlankQuestion;