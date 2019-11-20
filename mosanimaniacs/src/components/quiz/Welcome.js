import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuizzes } from '../../redux/actions/quizAdmin';
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';

class Welcome extends Component {

    componentDidMount() {
        // this.props.getAllQuizzes('/api/quizzes');
    }

    render() {
        return (
            <div id="welcome">
                <div className="row">
                    <div className="col-sm text-center welcomeText">
                        Welcome to our game
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm text-center startBtn">
                        <Link to ="/quiz"><button type="button" className="btn btn-primary">START GAME</button></Link>
                        <Link to ="/admin" /*onClick={() => {
                            console.log('hey');
                            this.props.getAllQuizzes('/api/quizzes');
                        }}*/><button type="button" className="btn btn-primary">ADMIN</button></Link>
                    </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    const quizzes = state.QuizzesReducer;
    return {
        quizzes
    }
}


export default connect(mapStateToProps, {
    getAllQuizzes
})(Welcome);
