import React, { Component } from "react";
import '../../../css/createQuiz.css';

class MultipleChoiceQuestion extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditQuestion = this.handleEditQuestion.bind(this);
        this.handleEditAnswerChoices = this.handleEditAnswerChoices.bind(this);
        this.form = React.createRef();
        this.data = {};
        this.state = {
            type: "multiple-choice",
            question: '',
            answerChoices: [],
            correctAnswer: '',
            isEdit: false,
            index: 0,
            Attempted: false,
            Correct: null
          };
    }

    componentDidMount() {
        const { className, index, theQuestion, theAnswerChoices, theCorrectAnswer } = this.props;
        this.setState({
            question: theQuestion,
            answerChoices: theAnswerChoices,
            correctAnswer: theCorrectAnswer,
            index
        })
    }

    handleSubmitQuestion(e) {
        e.preventDefault();
        e.persist();
        this.setState({
            isEdit: false,
        }, () => {
            console.log(this.state);
            this.props.updateQuestion(this.state);
        });
    }

    handleEditAnswerChoices(e) {
        e.preventDefault();
        e.persist();
        let answerIndex;
        switch(e.target.name) {
            case 'answerChoice0':
                answerIndex = 0;
                break;
            case 'answerChoice1':
                answerIndex = 1;
                break;
            case 'answerChoice2':
                answerIndex = 2;
                break;
            case 'answerChoice3':
                answerIndex = 3;
                break;
            default:
                break;
        }
        this.setState(prevState => {
            const updatedAnswerchoices = this.state.answerChoices.map((current,index) => {
                if (answerIndex === index) {
                    return e.target.value;
                } else {
                    return this.state.answerChoices[index];
                }
            });
            return {
                ...prevState,
                answerChoices: updatedAnswerchoices
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

    handleEditQuestion(e) {
        e.preventDefault();
        e.persist();
        this.setState({
            question: e.target.value
        });
    }

    handleCorrectAnswer(e) {
        let answer;
        this.state.answerChoices.reduce((acc,el,i) => {
            if (i === parseInt(e.target.id)) {
                answer = el;
            }
        },"");
        this.setState({
            correctAnswer: answer
        });

    }

    handleEdit() {
        this.setState({isEdit: true});
    }

    render() {
        const { question, answerChoices, isEdit, correctAnswer } = this.state;
        const { className, deleteQuestion } = this.props;
        return (
            <>
            {(() => {
                if (isEdit) {
                    return <form onSubmit={this.handleSubmitQuestion} ref={this.form}>
                    <div>
                        <input type="text" name="questionTitle" onChange={this.handleEditQuestion} className="questionTitle" placeholder="Question" defaultValue={question}/>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Answer Choice</th>
                                    <th>Correct Answer?</th>
                                </tr>
                                {answerChoices.map((answerChoice,index) => {
                                    return  <tr>
                                                <td><input type="text" onChange={this.handleEditAnswerChoices} name={`answerChoice${index}`} className={`answerChoice${index}`} defaultValue={answerChoice}/></td>
                                                <td><input type="radio" id={index} onChange={this.handleCorrectAnswer} name="correctAnswer" defaultValue={answerChoice}/></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                        <button className="save">Save</button>
                        <button className="delete" onClick={() => deleteQuestion(this.state)}>Delete</button>
                        <br/>
                    </div>
                </form>
                } else {
                    return  <div className={className}>
                                <p><strong>Question</strong>: {question}</p>
                                <p><strong>Answer Choices</strong>:</p>
                                <ul>
                                    {answerChoices.map((answer,index) => <li key={index}>{answer}</li>)}
                                </ul>
                                <p><strong>Correct Answer</strong>: {correctAnswer}</p>
                                <button onClick={this.handleEdit}>Edit&nbsp;&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
                                <button className="delete" onClick={() => deleteQuestion(this.state)}>Delete</button>
                            </div>    
                }
            })()}
            </>
        )
    }
}

export default MultipleChoiceQuestion;