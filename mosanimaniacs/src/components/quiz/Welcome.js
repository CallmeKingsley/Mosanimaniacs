import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';

class Welcome extends Component {
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
                        <Link to ="/admin/create"><button type="button" className="btn btn-primary">CREATE QUIZ</button></Link>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Welcome;