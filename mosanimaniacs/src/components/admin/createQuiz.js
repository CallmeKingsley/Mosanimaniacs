import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../../css/Welcome.css';
import MultiChoice from './questionTypes/multChoice';

class CreateQuiz extends Component {

    constructor(props) {
        super(props);

        this.questionType = React.createRef();
        this.renderedForm = React.createRef();
        this.renderQuestionType = this.renderQuestionType.bind(this);

        this.state = {
            questions: []
        }
    }

    renderQuestionType (e) {
        // console.log(e.target.value);
        // let component = <MultiChoice/>;
        // console.log(component);
        // switch(e.target.value) {
        //     case "multiple-choice":
        //         component = <MultiChoice/>;
        // }
        // console.log(component);
        // this.renderedForm.current.innerHTML = component;
        // console.log(component);
        let component = e.target.value;
        this.setState(prevState => {
            console.log(e);
            return {
                questions: [
                    ...prevState.questions,
                    component
                ]
            }
        });
    }

    render() {
        const { questions } = this.state;
        return (
            <div id="welcome" className="container">
                <h1 className="text-center">Create Quiz</h1>
                <form>
                    <fieldset>
                        <input type="text" name="quizTitle" id="quizTitle"/>
                    </fieldset>
                    <fieldset>
                        <div id="renderedForm" ref={this.renderedForm}>
                            
                        </div>
                    </fieldset>
                    <fieldset>
                    <label htmlFor="questionType">Select Question Type:</label>
                        <select id="questionType" ref={this.questionType} onChange={this.renderQuestionType}>
                            <option value="fill-in-blank">Fill In The Blank</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="circuit">Circuit</option>
                        </select>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default CreateQuiz;