import React, {useState} from "react"
import { Questions } from "../Helpers/Questions"

var currQuestionIndex = 0;
var optionsChosen = [];

// creates empty 2d array with sub arrays corresponding with each question
for (var i = 0; i < Questions.length; i++) {optionsChosen.push([])}

function Quiz() {
  // changes state based on current question
  const [currQuestion, setCurrQuestion] = useState(currQuestionIndex);

  const previousQuestion = () => {
    currQuestionIndex--;
    setCurrQuestion(currQuestionIndex);
  }
  
  const nextQuestion = () => {
    currQuestionIndex++;

    // if finish button is clicked, submit form
    if (currQuestionIndex >= Questions.length) {/*TODO*/}

    setCurrQuestion(currQuestionIndex);
  }

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
          Object.values(Questions[currQuestion]).slice(1).map((option, i) => (
            //<button onClick={() => onOptionUpdate(optionsChosen, i)}>{option}</button>
            <form>
              <label>
                <input type="checkbox" id={i} onClick={(e) => {onOptionUpdate(e);}}></input>
                {option}
              </label>
            </form>
          ))
        }
      </div>
      <button disabled={currQuestionIndex <= 0 ? true : false} onClick={() => previousQuestion()}>Back</button>
      <button onClick={() => nextQuestion()}>{currQuestionIndex >= Questions.length - 1 ? "Finish" : "Next"}</button>
    </div>
  );
}

// fills current question with previously selected answers
function populateOptions() {
  // TODO
  console.log("finished")
  //const currQuestionChosen
}

// updates option selection by adding the index of the selected option to optionsChosen array
const onOptionUpdate = (e) => {
  const currOptionsChosen = optionsChosen[currQuestionIndex];
  const checked = e.target.checked;
  if (checked) {
    // adds index of option selected to the corresponding question array if checked
    currOptionsChosen.push(e.target.id);
    console.log(optionsChosen);
  } else {
    // removes index of option selected to the corresponding question array if unchecked
    currOptionsChosen.splice(currOptionsChosen.indexOf(e.target.id), 1);
    console.log(optionsChosen);
  }
};

export default Quiz;
