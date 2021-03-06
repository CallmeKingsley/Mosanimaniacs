import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';
import { submitQuiz, getAllQuizzes, updateQuiz, deleteQuiz } from '../../redux/actions/quizAdmin';
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
        this.data = [];

        this.state = {
            title: "",
            questionType: "",
            quizId: "",
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
        const { selectedQuiz } = this.props;
        console.log(selectedQuiz);
        this.setState({
            questions: selectedQuiz.questions,
            title: selectedQuiz.quizTitle,
            quizId: selectedQuiz._id
        });
        console.log(typeof this.props.urlQuizId);
    }
    
    handleSubmitTitle = (e) => {
        e.preventDefault();
        this.setState({
            titledisabled: true
        });
    }

    handleChangeTitle = (e) => {
        e.preventDefault();
        if (!this.state.titledisabled) {
            const title = e.target.value;
            this.setState({
                title: title,
            });    
        }
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

    handleUpdateQuiz = () => {
        const { title, questions, quizId } = this.state;
        let quiz = {
            quizTitle: title,
            questions: questions,
            // quizId: quizId
        }
        console.log(quiz);
        this.props.updateQuiz(`/api/quizzes/${this.props.urlQuizId}`, quiz);
        window.location.href="/admin";
    }

    handleDeleteQuiz = (url, id) => {
        this.props.deleteQuiz(url, id);
        window.location.href="/admin";
    }

    render() {
        const { questions, questionTypes, questionSelectDisabled, titledisabled, title, quizId } = this.state;
        return (
            <section id="editQuiz">
                <header>
                    <h1 className="text-center">Create Quiz</h1>
                </header>
                <div className="container">
                <form onSubmit={this.handleSubmitTitle}>
                    <fieldset>
                        <input type="text" name="quizTitle" id="quizTitle" onChange={this.handleChangeTitle} disabled={titledisabled} defaultValue={title}/>
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
                                            answer={el.correctAnswer}
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
                <button onClick={this.handleUpdateQuiz}>Submit!</button>
                <button onClick={() => this.handleDeleteQuiz(`/api/quizzes/${quizId}`, quizId)} 
                className="btn btn-danger">
                    Delete Quiz <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <Link to="/admin"><button type="button" className="btn btn-primary">Back</button></Link>
                </div>
            </section>
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
        selectedQuiz,
        urlQuizId
    }
}

export default connect(mapStateToProps, {
    getAllQuizzes,
    submitQuiz,
    updateQuiz,
    deleteQuiz
})(EditQuiz);