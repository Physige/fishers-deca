import './App.css';
import React, { useState, useContext } from "react"
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import Results from "./Components/Results";

import { SiteContext } from "./Helpers/Contexts";

function App() {
  const [siteState, setSiteState] = useState("home");

  return (
    <div className="App">
      <h1>Survey</h1>
      <SiteContext.Provider value={{ siteState, setSiteState }}>
        {siteState === "home" && <Home />}
        {siteState === "quiz" && <Quiz />}
        {siteState === "results" && <Results />}
      </SiteContext.Provider> 
    </div>
  );
}

export default App;
