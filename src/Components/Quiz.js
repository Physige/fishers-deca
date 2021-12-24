import React, {useState, useContext} from "react"
import { Questions } from "../Helpers/Questions"
import { SiteContext } from "../Helpers/Contexts";

function Quiz() {
  const { setSelected, setSiteState } = useContext(SiteContext);

  // changes state based on current question
  const [currQuestion, setCurrQuestion] = useState(0);

  // makes empty 2d array corresponding to each question
  const [checkboxStates, setCheckboxStates] = useState(Questions.map(() => {return [];}));

  const previousQuestion = () => {
    setCurrQuestion(currQuestion - 1);
  }
  
  const nextQuestion = () => {
    setCurrQuestion(currQuestion + 1);

    // if finish button is clicked, submit form
    if (currQuestion >= Questions.length - 1) {
      // passes the checkboxStates to the context's selected state
      setSelected(checkboxStates);
      setSiteState("results");
    }
  }

  // populates current question with previously selected answers or updates selections when clicked
  const populateCheckboxes = (e) => {
    // NOTE: the [... ###] is needed for the stateful array to be updated
    // current state of checkboxStates
    let allQuestionsState = [... checkboxStates];

    // current state of checkboxes on current question
    let currQuestionState = [... checkboxStates[currQuestion]];

    let checked = e.target.checked;
    
    if (checked) {
      // adds id of selected question to corresponding array in checkboxStates
      // NOTE: these extra steps need to be taken for updating a stateful array
      currQuestionState.push(e.target.id);
      allQuestionsState[currQuestion] = currQuestionState;
      console.log(allQuestionsState);
      setCheckboxStates(allQuestionsState);
    } else {
      // removes id of selected question to corresponding array in checkboxStates
      // NOTE: these extra steps need to be taken for updating a stateful array
      // TODO maybe: check if indexOf returns -1
      currQuestionState.splice(currQuestionState.indexOf(e.target.id), 1);
      allQuestionsState[currQuestion] = currQuestionState;
      console.log(allQuestionsState);
      setCheckboxStates(allQuestionsState);
    }
  };
  
  return (
    <div className="Quiz">
      <progress value={(currQuestion/Questions.length)*100} max="100"></progress>

      <h1>Question {currQuestion + 1}</h1>

      <p>{Questions[currQuestion].question}</p>
      
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