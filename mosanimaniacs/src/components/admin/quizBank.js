import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import { getAllQuizzes } from '../../redux/actions/quizAdmin';
import {Link} from 'react-router-dom';
import CreateQuiz from './createQuiz';

class QuizBank extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getAllQuizzes('/api/quizzes');
        // this.renderQuizzes(this.props.quizzes);
    }

    renderQuizzes = (quizzes) => {
        return (
            quizzes.map((quiz, index) => {
                return  <div>
                            <h3>{quiz.quizTitle}</h3>
                            <Link to={`/admin/edit/${quiz._id}`}>
                                <button type="button" className="btn btn-primary">
                                    Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                            </Link>
                            <button className="btn btn-danger">Delete <i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div> 
            })
        )
    }

    render() {
        const { quizzes } = this.props;
        return(
            <>
                <h1>Admin Page</h1>
                <h2>Select from the quizzes below to edit, or create a new quiz</h2>
                <div id="renderedQuizzes">
                    {/* {(() => {
                        this.renderQuizzes()
                    })()} */}
                    {/* Rendered quizzes will go here */}
                    {quizzes.map((quiz, index) => {
                                return  <div>
                                            <h3>{quiz.quizTitle}</h3>
                                            <Link to={`/admin/edit/${quiz._id}`}>
                                                <button type="button" className="btn btn-primary">
                                                    Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i>
                                                </button>
                                            </Link>
                                        </div> 
                            })
                        }
                </div>
                <Link to="/admin/create"><button type="button" className="btn btn-primary">Create Quiz</button></Link>
            </>
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
    getAllQuizzes
})(QuizBank);