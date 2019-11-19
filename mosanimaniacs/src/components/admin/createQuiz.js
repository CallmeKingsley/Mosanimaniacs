import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../../css/Welcome.css';
import MultiChoiceForm from './questionForms/multChoiceForm';
import FillBlankForm from './questionForms/fillBlankForm';
import CircuitForm from './questionForms/circuitForm';
import MultiChoiceQuestion from './questionTypes/multiChoice';
import FillBlankQuestion from './questionTypes/fillBlank';
import CircuitQuestion from './questionTypes/circuit';
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
        this.updateQuestion = this.updateQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
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
        console.log(data.index);
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
    /*
case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
            const updatePlayerList = state.players.map((player, index) => {
            if(index === action.index){
            return {
              ...player,
               score: player.score + action.score,
               updated: time
             };
          }
          return player;
        });
              return {
                  ...state,
                  players: updatePlayerList
              };
        }
    */
    updateQuestion(data) {
        console.log(data);
        this.setState(prevState => {
            const updatedList = prevState.questions.map((question, num) => {
                if (num === data.index) {
                    return {
                        ...data
                    }
                } else {
                    return prevState.questions[num];
                }
            });
            console.log(updatedList);
            return {
                ...prevState,
                questions: updatedList
            }
        });
    }

    deleteQuestion(data) {
        // const removeQuestionList = [
        //     ...this.state.questions.slice(0,data.index),
        //     ...this.state.questions.slice(data.index + 1)
        // ];
        this.setState(prevState => {
            return {
                questions: prevState.questions.filter(el => el.index !== data.index)
            };
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
                                            index={i}
                                            question={el.question}
                                            answer={el.answer}
                                            updateQuestion={this.updateQuestion}
                                            deleteQuestion={this.deleteQuestion}
                                        />
                            case "multiple-choice":
                                return <MultiChoiceQuestion
                                            className={el.type}
                                            key={i}
                                            index={i}
                                            theQuestion={el.question}
                                            theAnswerChoices={el.answerChoices}
                                            theCorrectAnswer={el.correctAnswer}
                                            updateQuestion={this.updateQuestion}
                                            deleteQuestion={this.deleteQuestion}
                                        />
                        }
                    })}
                </div>
                <div id="renderedForm" ref={this.renderedForm}>
                    {(() => {
                        switch(this.state.questionType) {
                            case "multiple-choice":
                                return <MultiChoiceForm 
                                            updateQuiz={this.updateQuiz}
                                            length={this.state.questions.length}
                                        />;
                            case "fill-in-blank":
                                return <FillBlankForm 
                                            updateQuiz={this.updateQuiz}
                                            length={this.state.questions.length}
                                        />;
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