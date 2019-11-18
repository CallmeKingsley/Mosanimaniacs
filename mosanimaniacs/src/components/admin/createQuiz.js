import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../../css/Welcome.css';
import MultiChoiceForm from './questionForms/multChoiceForm';
import FillBlankForm from './questionForms/fillBlankForm';
import CircuitForm from './questionForms/circuitForm';
// import MultiChoiceQuestion from './questionTypes/multChoice';
// import FillBlankQuestion from './questionTypes/fillBlank';
// import CircuitQuestion from './questionTypes/circuit';
class CreateQuiz extends Component {

    constructor(props) {
        super(props);

        this.questionType = React.createRef();
        this.renderedForm = React.createRef();
        this.renderQuestions = React.createRef();
        this.renderQuestionType = this.renderQuestionType.bind(this);
        this.handleSubmitTitle = this.handleSubmitTitle.bind(this);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.updateQuiz = this.updateQuiz.bind(this);
        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.data = [];

        this.state = {
            title: "",
            questionType: "",
            /*questionSelectDisabled is the boolean that 
            will disable and re-enable the question type
            select menu*/
            questionSelectDisabled: false,
            titledisabled: false,
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

    handleSubmitTitle (e) {
        e.preventDefault();
        const title = e.target.quizTitle.value;
        this.setState({
            title: title,
            titledisabled: true
        });
    }

    handleEditTitle(e) {
        e.preventDefault();
        this.setState({
            titledisabled: false
        });
    }

    handleSubmitQuestion (e) {
        console.log(e);
    }

    updateQuiz(data) {
        console.log(data);
        this.setState(prevState => {
            return {
                questionType: "",
                questionSelectDisabled: false,
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
        this.setState({
            questionSelectDisabled: true,
            questionType: component
        });
        //sets the value of the select menu to question-type
        e.target.value = "question-type";
    }

    render() {
        const { questions, questionTypes, questionSelectDisabled, titledisabled } = this.state;
        return (
            <div id="welcome" className="container">
                <h1 className="text-center">Create Quiz</h1>
                <form onSubmit={this.handleSubmitTitle}>
                    <fieldset>
                        <input type="text" name="quizTitle" id="quizTitle" disabled={titledisabled}/>
                    </fieldset>
                    <button type="submit">Save Title</button>
                    <button onClick={this.handleEditTitle}>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
                </form>
                <div id="renderedQuestions" ref={this.renderQuestions}>
                    {this.state.questions.map((el,i) => {
                        switch(el.type) {
                            case "fill-in-blank":
                                return <FillBlankQuestion 
                                            className={el.type}
                                            key={i}
                                            question={el.question}
                                            answer={el.answer}
                                        />
                            case "multiple-choice":
                                return  <div className={el.type} key={i}>
                                            <p>{el.question}</p>
                                            {el.answerChoices.map((answer,index) => <p key={index}>{answer}</p>)}
                                            <p>{el.correctAnswer}</p>
                                        </div>
                        }
                    })}
                </div>
                <div id="renderedForm" ref={this.renderedForm}>
                    {(() => {
                        switch(this.state.questionType) {
                            case "multiple-choice":
                                return <MultiChoiceForm updateQuiz={this.updateQuiz}/>;
                            case "fill-in-blank":
                                return <FillBlankForm updateQuiz={this.updateQuiz}/>;
                            case "circuit":
                                return <CircuitForm updateQuiz={this.updateQuiz}/>;
                            case "question-type":
                                return;
                        }
                    })()}
                </div>
                <label htmlFor="questionType">Select Question Type:</label>
                <select id="questionType" ref={this.questionType} disabled={questionSelectDisabled} onChange={this.renderQuestionType}>
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