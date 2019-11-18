import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlankQuestion extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.question = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        this.answer = React.createRef();
        this.state = {
            isEdit: false,
            type: "fill-in-blank",
            question: "",
            answer: "",
            index: 0
        }
    }

    componentDidMount() {
        const { index, question, answer } = this.props;
        this.setState({
            question,
            answer,
            index
        })
    }

    handleEdit() {
        console.log(this.state.answerChoices);
        this.setState({isEdit: true});
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        this.setState({
            question: this.question.current.value,
            answer: this.answer.current.value,
        },() => {
            this.props.updateQuiz(this.state);
        });
    }

    render() {
        const { className, key, question, answer } = this.props;
        return (
            // <>
            // </>
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