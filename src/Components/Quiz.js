import React, {useState} from "react"
import { Questions } from "../Helpers/Questions"

function Quiz() {

  // changes state based on current question
  const [currQuestion, setCurrQuestion] = useState(0);

  // makes empty 2d array corresponding to each question
  const [checkboxStates, setCheckboxStates] = useState(Questions.map(() => {return [];}));

  const previousQuestion = () => {
    setCurrQuestion(currQuestion - 1);
  }
  
  const nextQuestion = () => {
    // if finish button is clicked, submit form
    if (currQuestion >= Questions.length) {/*TODO*/}

    setCurrQuestion(currQuestion + 1);
  }

  // populates current question with previously selected answers or updates question with new selections
  const populateCheckboxes = (e) => {
    // current state of checkboxStates
    let allQuestionsState = [... checkboxStates];

    // current state of checkboxes on current question
    let currQuestionState = [... checkboxStates[currQuestion]];

    let checked = e.target.checked;
    
    if (checked) {
      // adds id of selected question to corresponding array in checkboxStates
      currQuestionState.push(e.target.id);
      allQuestionsState[currQuestion] = currQuestionState;
      console.log(allQuestionsState);
      setCheckboxStates(allQuestionsState);
    } else {
      // removes id of selected question to corresponding array in checkboxStates
      currQuestionState.splice(currQuestionState.indexOf(e.target.id), 1);
      allQuestionsState[currQuestion] = currQuestionState;
      console.log(allQuestionsState);
      setCheckboxStates(allQuestionsState);
    }
  };
  
  return (
    <div className="Quiz">
      <h1>{Questions[currQuestion].question}</h1>
      
      <div id="options">
        {
          /* this boi is a mess
          takes the current queston's object from Questions.js (Questions[currQuestion]), 
          gets the values, exports values as array (Object.values()), 
          deletes the first key/value since thats the question/prompt(slice(1)),
          loops through array which also displays the values as buttons(map()) */
          Object.values(Questions[currQuestion]).slice(1).map((option, i) => { //REFACTOR LATER <====================================
            return (
              <form>
                <label>
                  <input type="checkbox" id={i} onChange={(e) => populateCheckboxes(e)} 
                    checked={checkboxStates[currQuestion].indexOf(String(i)) !== -1 ? true : false}></input>
                  {option}
                </label>
              </form>
            )
          })
        }
        
      </div>
      <button onClick={() => previousQuestion()} disabled={currQuestion <= 0 ? true : false}>Back</button>
      <button onClick={() => nextQuestion()}>{currQuestion >= Questions.length - 1 ? "Finish" : "Next"}</button>
    </div>
  );
}

export default Quiz;