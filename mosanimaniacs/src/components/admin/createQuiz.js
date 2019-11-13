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

        this.state = {
            questions: [
                // {
                //     type: "multiple-choice"
                // }
            ]
        }
    }

    

    stringifyFormData(fd) {
        const data = {};
          for (let key of fd.keys()) {
            data[key] = fd.get(key);
        }
        return JSON.stringify(data, null, 2);
      }

    handleSubmit (e) {
        e.preventDefault();
        // const data = new FormData(e.target);
        // console.log(data);
        let res = this.stringifyFormData(new FormData(e.target));
        console.log(res);
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

    renderQuestionType (e) {
        //gets the value from the form and then updates state
        let component = e.target.value;
        this.setState(prevState => {
            console.log(component);
            switch(component) {
                case "multiple-choice":
                    console.log("update state stuff for multi choice question");
            }
            return {
                questions: [
                    ...prevState.questions,
                    {
                        type: component
                    }
                ]
            }
        });

        //sets the value of the select menu to question-type
        e.target.value = "question-type";
    }

    render() {
        const { questions } = this.state;
        return (
            <div id="welcome" className="container">
                <h1 className="text-center">Create Quiz</h1>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="text" name="quizTitle" id="quizTitle"/>
                    </fieldset>
                    <fieldset>
                        <div id="renderedForm" ref={this.renderedForm}>
                            {questions.map((el,i) => {
                                switch(el.type) {
                                    case "multiple-choice":
                                        return <MultiChoice key={i} index={i}/>;
                                    case "fill-in-blank":
                                        return <FillBlank key={i} index={i}/>;
                                    case "circuit":
                                        return <Circuit key={i} index={i}/>;
                                    case "question-type":
                                        return;
                                }
                            })}
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="questionType">Select Question Type:</label>
                        <select id="questionType" ref={this.questionType} onChange={this.renderQuestionType}>
                            <option value="question-type">Question Type...</option>
                            <option value="fill-in-blank">Fill In The Blank</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="circuit">Circuit</option>
                        </select>
                    </fieldset>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateQuiz;