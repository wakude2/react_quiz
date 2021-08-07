import React, { Component} from 'react'
import {QuizData} from './QuizData';
//import React, {useState, useRef, useEffect} from 'react'




export class Quiz extends Component {
    state = {
        userAnswer:null,    //current users answer
        currentIndex:0,  //current questions index
        options: [],       //the four options
        quizEnd: false,
        score: 0,
        disabled: true
    }
        

        //Component that holds the current quiz
        loadQuiz = () => {
            const {currentIndex} = this.state //get the current index
            this.setState(() => {
                return {
                    question: QuizData[currentIndex].question,
                    options : QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer          
                }
            }
            )
        }

        //Handles Click event for the next button
        nextQuestionHander = () => {
            const {userAnswer, answer, score} = this.state
            this.setState({
                currentIndex: this.state.currentIndex + 1
            })

            //Check for correct answer and increment score
            if(userAnswer === answer){
                this.setState({
                    score: score + 1
                })
            }
        }

        //Load the quiz once the component mounts
        componentDidMount(){
            this.loadQuiz();
        }

        //Update the component
        componentDidUpdate(prevProps, prevState){
            const{currentIndex} = this.state;
            if(this.state.currentIndex !== prevState.currentIndex){
                this.setState(() => {
                    return {
                        disabled: true,
                        question: QuizData[currentIndex].question,
                        options : QuizData[currentIndex].options,
                        answer: QuizData[currentIndex].answer          
                    }
                });

            }
        }

        //Check the answer
        checkAnswer = answer => {
            this.setState({
                userAnswer: answer,
                disabled:false
            })
        }

        //Responds to the click of the finish button
        finishHandler =() => {
            if(this.state.currentIndex === QuizData.length -1){
                this.setState({
                    quizEnd:true
                })
            }

        }

        render() {
            const {question, options, currentIndex, userAnswer, quizEnd} = this.state //get the current state       
            if(quizEnd) {
                return (
                    <div>
                        <h1>Game Over. Final score is {this.state.score} points</h1>
                        <p>The correct Answers for the quiz are</p>
                        <ul>
                            {QuizData.map((item, index) => (
                                <li className='options'
                                    key={index}>
                                        {item.answer}
                                </li>
                        ))}
                        </ul>
                    </div>
                )
            }
                
            return (
                <div>
                    
                <h2>{question}</h2>
                    <span>{`Question ${currentIndex+1} of ${QuizData.length}`}</span>
                    {options.map(option => (  //for each option, new paragraph
                        <p key={option.id} 
                        className={`options ${userAnswer === option ? "selected" : null}`}
                        onClick= {() => this.checkAnswer(option)}>
                            {option}
                        </p>
                    ))}
                    {currentIndex < QuizData.length -1 &&  
                    // Next button only displays if the above is true
                    <button 
                        
                        className="ui inverted button" 
                        disabled = {this.state.disabled}
                        onClick = {this.nextQuestionHander}
                        
                    >Next Question</button>
                    }
                    {currentIndex === QuizData.length -1 &&
                        <button
                        className="ui inverted button"
                        disabled = {this.state.disabled}
                        onClick = {this.finishHandler}
                        >Finish</button>
                    }
                </div>
            )
        }
    }

export default Quiz
