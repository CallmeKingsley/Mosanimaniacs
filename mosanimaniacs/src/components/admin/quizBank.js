import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuizzes, deleteQuiz } from '../../redux/actions/quizAdmin';
import {Link} from 'react-router-dom';
import CreateQuiz from './createQuiz';

class QuizBank extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (!!this.props.quizzes) {
            this.props.getAllQuizzes('/api/quizzes');
        }
    }

    handleDeleteQuiz = (url, id) => {
        this.props.deleteQuiz(url, id);
        window.location.href="/admin";
    }

    render() {
        const { quizzes } = this.props;
        return(
            <section id="quizBank">
                <header>
                    <h1 className="text-center">Admin Page</h1>
                </header>
                <div className="container">
                    <h2 className="text-center mb-5">Select from the quizzes below to edit, delete, or create a new quiz.</h2>
                    <div id="rendered-quizzes">
                        {/* Rendered quizzes will go here */}
                        {quizzes.map((quiz, index) => {
                                    return  <div className="quiz">
                                                <h3 className="text-center">{quiz.quizTitle}</h3>
                                                <Link to={`/admin/edit/${quiz._id}`}>
                                                    <button type="button" className="btn btn-warning">
                                                        Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i>
                                                    </button>
                                                </Link>
                                                <button onClick={() => this.handleDeleteQuiz(`/api/quizzes/${quiz._id}`, quiz._id)} 
                                                className="btn btn-danger">
                                                    Delete Quiz <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </div> 
                                })
                            }
                    </div>
                    <div className="navBtns">
                        <Link to="/admin/create"><button type="button" className="btn btn-primary">Create Quiz</button></Link>
                        <Link to="/"><button type="button" className="btn btn-info">Home</button></Link>
                    </div>
                </div>
            </section>
        )
    }

}

function mapStateToProps(state) {
    const quizzes = state.QuizzesReducer.quizzes;
    return {
        quizzes
    }
}


export default connect(mapStateToProps, {
    getAllQuizzes,
    deleteQuiz
})(QuizBank);