import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';
import { submitQuiz, getAllQuizzes } from '../../redux/actions/quizAdmin';
import MultiChoiceForm from './questionForms/multChoiceForm';
import FillBlankForm from './questionForms/fillBlankForm';
// import CircuitForm from './questionForms/circuitForm';
import MultiChoiceQuestion from './questionTypes/multiChoice';
import FillBlankQuestion from './questionTypes/fillBlank';
// import CircuitQuestion from './questionTypes/circuit';

class EditQuiz extends Component {

    constructor(props) {
        super(props);

        this.questionType = React.createRef();
        this.renderedForm = React.createRef();
        this.renderQuestions = React.createRef();
        // this.renderQuestionType = this.renderQuestionType.bind(this);
        // this.deleteQuestion = this.deleteQuestion.bind(this);
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

    componentDidMount() {
        alert('hey');
        console.log(this.props.selectedQuiz);
    }
    
    handleSubmitTitle = (e) => {
        e.preventDefault();
        const title = e.target.quizTitle.value;
        this.setState({
            title: title,
            titledisabled: true
        });
    }

    handleEditTitle = (e) => {
        e.preventDefault();
        this.setState({
            titledisabled: false
        });
    }

    handleSubmitQuestion = (e) => {
        console.log(e);
    }

    updateQuiz = (data) => {
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

    updateQuestion = (data) => {
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

    deleteQuestion = (data) => {
        this.setState(prevState => {
            return {
                questions: prevState.questions.filter(el => el.index !== data.index)
            };
        });
    }

    renderQuestionType = (e) => {
        //gets the value from the form and then updates state
        let component = e.target.value;
        this.setState({
            questionSelectDisabled: true,
            questionType: component
        });
        //sets the value of the select menu to question-type
        e.target.value = "question-type";
    }

    handleSubmitQuiz = () => {
        let quiz = {
            quizTitle: this.state.title,
            questions: this.state.questions
        }
        console.log(JSON.stringify(quiz));
        this.props.submitQuiz('/api/quizzes', quiz);
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
                            default:
                                break;
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
                            // case "circuit":
                            //     return <CircuitForm updateQuiz={this.updateQuiz}/>;
                            case "question-type":
                                return;
                            default:
                                break;
                        }
                    })()}
                </div>
                <label htmlFor="questionType">Select Question Type:</label>
                <select id="questionType" ref={this.questionType} disabled={questionSelectDisabled} onChange={this.renderQuestionType}>
                    <option value="question-type">Question Type...</option>
                    <option value="fill-in-blank">Fill In The Blank</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    {/* <option value="circuit">Circuit</option> */}
                </select>
                <button onClick={this.handleSubmitQuiz}>Submit!</button>
                <Link to="/admin"><button type="button" className="btn btn-primary">Back</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const url = window.location.pathname;
    const parts = url.split('/');
    const urlQuizId = parts[parts.length-1];
    const quizzes = state.QuizzesReducer.quizzes;
    const selectedQuiz = state.QuizzesReducer.quizzes.find(x => x._id === urlQuizId);
    return {
        quizzes,
        selectedQuiz
    }
}

export default connect(mapStateToProps, {
    getAllQuizzes,
    submitQuiz
})(EditQuiz);