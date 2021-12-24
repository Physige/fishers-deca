import React, { useContext } from "react"
import { SiteContext } from "../Helpers/Contexts";
import { Questions } from "../Helpers/Questions";
import { Events } from "../Helpers/Events";
import Collapsible from 'react-collapsible';

function Results() {
  const { selected } = useContext(SiteContext);
  const unselected = invertSelected(selected);
  
  // creates list of events from each event in Events.js
  var eventList = Events.map((event) => {
    return Object.values(event)[0];
  })

  // removes items from eventList based on passed array
  const removeFromEventList = (toBeRemoved) => {
    for (var i = 0; i < toBeRemoved.length; i++) {
      let indexToRemove = eventList.indexOf(toBeRemoved[i]);
      if (indexToRemove > -1) {
        eventList.splice(indexToRemove, 1);
      }
    }
  }

  /*NOTE: so this is definitely not the best approach but i wanted to get this thing done before christmas;
  maybe ill fix it later and make it scaleable. My OG plan was to use a shareable google sheets containing 
  all the events and details/properties, use papaparse to parse the google sheets from a csv, import that 
  as a matrix, and use that in the quiz logic.*/

  // loops through unselected options and removes events with that unselected option from eventList
  for (var questionIndex = 0; questionIndex < unselected.length; questionIndex++) {
    for (var optionIndex = 0; optionIndex < unselected[questionIndex].length; optionIndex++) {

      let currUnselectedIndex = getOption(questionIndex, unselected[questionIndex][optionIndex]);
      
      switch (questionIndex) {
        // Are you a first year DECA Member?
        case 0:
          if (currUnselectedIndex === "Yes") {
            removeFromEventList(["Principles of Business Administration Events"]);
          }
          break;
        // What are your preferred group sizes?
        case 1:
          if (currUnselectedIndex === "1") {
            removeFromEventList(["Principles of Business Administration Events","Individual Series Events","Personal Finance Literacy","Professional Selling & Consulting Events"]);
          } else if (currUnselectedIndex === "2") {
            removeFromEventList(["Team Decision Making Events"]);
          } else if (currUnselectedIndex === "3") {
            removeFromEventList(["Business Operations Research","Project Management Events","Innovation Plan","Start-Up Business Plan","Independent Business Plan","International Business Plan","Business Growth Plan","Franchise Business Plan","Integrated Market Campaign Events","Stock Market Game","Virtual Business Challenge"]);
          }
          break;
        // What type of projects are you interested in?
        case 2:
          if (currUnselectedIndex === "Written Project w/Presentation (1-3 Participants)") {
            removeFromEventList(["Business Operations Research","Project Management Events","Innovation Plan","Start-Up Business Plan","Independent Business Plan","International Business Plan","Business Growth Plan","Franchise Business Plan","Integrated Market Campaign Events"]);
          } else if (currUnselectedIndex === "Role-Play (1 Participant)") {
            removeFromEventList(["Principles of Business Administration Events","Individual Series Events","Personal Finance Literacy"]);
          } else if (currUnselectedIndex === "Case Study (2 Participants)") {
            removeFromEventList(["Team Decision Making Events"]);
          } else if (currUnselectedIndex === "Professional Selling Event (? Participants)") {
            removeFromEventList(["Professional Selling & Consulting Events"]);
          } else if (currUnselectedIndex === "Online Competition (1-3 Participants)") {
            removeFromEventList(["Stock Market Game","Virtual Business Challenge"]);
          }
          break;
        // Project with exam?
        case 3:
          if (currUnselectedIndex === "Yes (With Exam)") {
            removeFromEventList(["Principles of Business Administration Events","Team Decision Making Events","Individual Series Events","Personal Finance Literacy","Integrated Market Campaign Events","Professional Selling & Consulting Events"]);
          } else if (currUnselectedIndex === "No (Without Exam)") {
            removeFromEventList(["Business Operations Research","Project Management Events","Innovation Plan","Start-Up Business Plan","Independent Business Plan","International Business Plan","Business Growth Plan","Franchise Business Plan","Stock Market Game","Virtual Business Challenge"]);
          }
          break;
      }
    }
  }

  return (
    <div className="Results">
      {
        eventList.map((event, i) => {
          return (
            <Collapsible trigger={event}>
              {
                getEventDetails(event).map((eventDetails, i) => {
                  return (
                    <p>{eventDetails}</p>
                  )
                })
              }
            </Collapsible>
          )
        })
      }

      <p>{eventList.length < 1 ? "No event could be found. Make sure you select All THAT APPLY. Please try again." : ""}</p>
    </div>
  );
}

// HELPER FUNCTIONS

// takes selected array and returns array with all the unselected options
function invertSelected(selected) {
  var invertedSelected = [];

  // loops through each question
  for (var questionIndex = 0; questionIndex < selected.length; questionIndex++) {
    var allQuestionOptions = [];

    // loops through all options in the current question and pushes them to allQuestionOptions
    for (var i = 0; i < Object.values(Questions[questionIndex]).slice(1).length; i++) {
      allQuestionOptions.push(String(i));
    }
    
    // loops currently selected options
    for (var optionIndex = 0; optionIndex < selected[questionIndex].length; optionIndex++) {
      // if currently selected option is in allQuestionOptions, then remove it 
      if (allQuestionOptions.indexOf(selected[questionIndex][optionIndex]) !== -1)
        allQuestionOptions.splice(allQuestionOptions.indexOf(selected[questionIndex][optionIndex]), 1);
    }

    // adds current question's unselected options to the full array
    invertedSelected.push(allQuestionOptions);
  }
  return invertedSelected;
}

// returns the option's content from Questions.js based on index of question and index of option
function getOption(questionIndex, optionIndex) {
  var questionOptions = Object.values(Questions[questionIndex]).slice(1);
  return questionOptions[optionIndex];
}

// gets event's details from Events.js
function getEventDetails(event) {
  // loop through all events
  for (var eventIndex = 0; eventIndex < Events.length; eventIndex++) {
    let eventDetails = Object.values(Events[eventIndex]);

    // checks if passed event equals current event
    if (eventDetails[0] === event) {

      // passes event details
      return eventDetails[1];
    }
  }
  return [];
}

export default Results;
