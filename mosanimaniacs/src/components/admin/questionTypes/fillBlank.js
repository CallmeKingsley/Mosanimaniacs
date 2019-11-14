import React, { Component } from "react";
import '../../../css/Welcome.css';

class FillBlank extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.stringifyFormData = this.stringifyFormData.bind(this);
        this.question = React.createRef();
        this.answer = React.createRef();
        this.data = {};
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
        console.log(JSON.stringify(otherStuff));
        this.props.updateQuiz(otherStuff);
    }

    stringifyFormData(fd) {
        const questionData = {};
        for (let key of fd.keys()) {
            questionData[key] = fd.get(key);
        }
        this.data.push(JSON.stringify(questionData, null, 2));
        console.log(this.data);  
      }


    render() {
        const { index } = this.props;
        return (
            <form onSubmit={this.handleSubmitQuestion}>
                <fieldset>
                    <div>
                        <input type="text" name={`questionTitle-${index}`} ref={this.question} 
                        className={`questionTitle-${index}`} placeholder="Question"/>

                        <input type="text" name={`correctAnswer-${index}`} ref={this.answer}
                        className={`correctAnswer-${index}`} placeholder="Correct Answer"/>

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

export default FillBlank;