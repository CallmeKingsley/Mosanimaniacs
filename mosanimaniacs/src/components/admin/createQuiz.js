import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../../css/Welcome.css';
import MultiChoice from './questionTypes/multChoice';
import FillBlank from './questionTypes/fillBlank';
import Circuit from './questionTypes/circuit';

class CreateQuiz extends Component {

    constructor(props) {
        super(props);

        this.questionType = React.createRef();
        this.renderedForm = React.createRef();
        this.renderQuestionType = this.renderQuestionType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitTitle = this.handleSubmitTitle.bind(this);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.updateQuiz = this.updateQuiz.bind(this);
        this.data = [];

        this.state = {
            title: "",
            questionTypes: [],
            questions: [
                // {
                //     type: "multiple-choice"
                // }
            ]
        }
    }

    

    stringifyFormData(fd) {
        const { questions } = this.state;
        questions.forEach((el,i) => {
            const questionData = {};
            for (let key of fd.keys()) {
                questionData[key] = fd.get(key);
            }
            this.data.push(JSON.stringify(questionData, null, 2));
            console.log(this.data);  
            });
      }

    handleSubmit (e) {
        e.preventDefault();
        console.log(e.children);
        // const data = new FormData(e.target);
        // console.log(data);
        let res = this.stringifyFormData(new FormData(e.target));
        // this.setState({
        //     res: stringifyFormData(data),
        //   });
          //////////
        //   let data = new Promise((resolve, reject) => {
        //       resolve(new FormData(e.target));
        //       reject((err) => console.log(err));
        //   });
        //   data()
        //     .then((json) => {
        //         console.log(json);
        //         return json;
        //     })
        //   console.log(data);
    }

    handleSubmitTitle (e) {
        e.preventDefault();
        const title = e.target.quizTitle.value;
        this.setState({title: title});
    }

    handleSubmitQuestion (e) {
        console.log(e);
    }

    updateQuiz(data) {
        console.log(data);
        this.setState(prevState => {
            return {
                questions: [
                    ...prevState.questions,
                    data
                ]
            }
        });
    }

    renderQuestionType (e) {
        //gets the value from the form and then updates state
        let component = e.target.value;
        this.setState(prevState => {
            switch(component) {
                case "multiple-choice":
                    console.log("update state stuff for multi choice question");
            }
            return {
                questionTypes: [
                    ...prevState.questionTypes,
                    component
                ]
            }
        });

        //sets the value of the select menu to question-type
        e.target.value = "question-type";
    }

    render() {
        const { questions, questionTypes } = this.state;
        return (
            <div id="welcome" className="container">
                <h1 className="text-center">Create Quiz</h1>
                <form onSubmit={this.handleSubmitTitle}>
                    <fieldset>
                        <input type="text" name="quizTitle" id="quizTitle"/>
                    </fieldset>
                    <button type="submit">Save Title</button>
                </form>
                <div id="renderedForm" ref={this.renderedForm}>
                    {questionTypes.map((el,i) => {
                        switch(el) {
                            case "multiple-choice":
                                return <MultiChoice key={i} index={i} updateQuiz={this.updateQuiz}/>;
                            case "fill-in-blank":
                                console.log('do something');
                                return <FillBlank key={i} index={i} updateQuiz={this.updateQuiz}/>;
                            case "circuit":
                                return <Circuit key={i} index={i}/>;
                            case "question-type":
                                return;
                        }
                    })}
                </div>
                <label htmlFor="questionType">Select Question Type:</label>
                <select id="questionType" ref={this.questionType} onChange={this.renderQuestionType}>
                    <option value="question-type">Question Type...</option>
                    <option value="fill-in-blank">Fill In The Blank</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="circuit">Circuit</option>
                </select>
            </div>
        )
    }
}

export default CreateQuiz;