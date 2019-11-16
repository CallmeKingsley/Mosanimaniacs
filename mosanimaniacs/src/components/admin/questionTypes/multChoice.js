import React, { Component } from "react";
import '../../../css/createQuiz.css';

class MultipleChoice extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.handleAnswerChoice = this.handleAnswerChoice.bind(this);
        // this.question = React.createRef();
        // this.answer = React.createRef();
        this.form = React.createRef();
        this.data = {};
        this.state = {
            type: "multiple-choice",
            question: '',
            answerChoices: [
                // {answerChoice0: ""},
                // {answerChoice1: ""},
                // {answerChoice2: ""},
                // {answerChoice3: ""}
            ],
            correctAnswer: ''  
          };
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        e.persist();
        console.log(e.currentTarget);
        // let stuff = [this.question.current.value,this.answer.current.value];
        // let otherStuff = {
        //     type: "multiple-choice",
        //     question: this.question.current.value,
        //     answerChoices: {

        //     },
        //     answer: 
        // };
        // let res = this.stringifyFormData(otherStuff);
        const inputs = e.target.getElementsByTagName('input');
        const answerChoices = [
            inputs.answerChoice0.value,
            inputs.answerChoice1.value,
            inputs.answerChoice2.value,
            inputs.answerChoice3.value
        ];
        this.setState({
            // answerChoices: [
            //     inputs.answerChoice0.value,
            //     inputs.answerChoice1.value,
            //     inputs.answerChoice2.value,
            //     inputs.answerChoice3.value
            // ],
            answerChoices: answerChoices,
            correctAnswer: answerChoices.reduce((acc,el,i) => {
                if (i === this.state.correctAnswer) {
                    return el;
                }
            },"")
        });
    }

    handleCorrectAnswer(e) {
        this.setState({correctAnswer: parseInt(e.target.id)});
    }

    //also takes the question input field
    handleAnswerChoice(e) {
        e.persist();
        console.log(e.target);
        switch(e.target.name) {
            // case "questionTitle":
            //     this.setState({question: e.target.value});
            //     break;
            // case "answerChoice0":
                // console.log('wut');
                // this.setState(prevState => {
                //     console.log(e.target.id);
                // })
            // case "answerChoice1":
            // case "answerChoice2":
            case "answerChoice3":
                this.setState(prevState => {
                    // return {
                    //     answerChoices: [
                    //         ...prevState.answerChoices,
                    //         {
                    //             answer: e.target.value,
                    //             id: e.target.id
                    //         }
                    //     ]
                    // }
                    // answerChoice3: prevState.answerChoices[e.target.id].answerChoice3 
                    // answerChoice3: prevState.answerChoices[e.target.id].answerChoice3 += e.target.value
                    return {
                        answerChoices: [
                            ...prevState.answerChoices.slice(0,e.target.id),
                            Object
                        ]
                    }
                })
                break;
            // case "answerChoice1":
            //     this.setState({answerChoice1: e.target.value});
            //     break;
            // case "answerChoice2":
            //     this.setState({answerChoice2: e.target.value});
            //     break;
            // case "answerChoice3":
            //     this.setState({answerChoice3: e.target.value});
            //     break;
        }
    }

    render() {
        const { answerChoice0, answerChoice1, answerChoice2, answerChoice3 } = this.state;
        return (
            <form onSubmit={this.handleSubmitQuestion} ref={this.form}>
                <div>
                    <input type="text" onChange={this.handleAnswerChoice} name="questionTitle" className="questionTitle" placeholder="Question"/>
                    <table>
                        <tbody>
                            <tr>
                                <th>Answer Choice</th>
                                <th>Correct Answer?</th>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice0" className="answerChoice0"/></td>
                                <td><input type="radio" id="0" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice0}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice1" className="answerChoice1"/></td>
                                <td><input type="radio" id="1" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice1}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice2" className="answerChoice2"/></td>
                                <td><input type="radio" id="2" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice2}/></td>
                            </tr>
                            <tr>
                                <td><input type="text"   name="answerChoice3" className="answerChoice3"/></td>
                                <td><input type="radio" id="3" onChange={this.handleCorrectAnswer} name="correctAnswer" value={answerChoice3}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="save">Save</button>
                    <button className="delete">Delete</button>
                    <br/>
                </div>
            </form>
        )
    }
}

export default MultipleChoice;