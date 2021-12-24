import './App.css';
import './index.css';
import React, { useState, useContext } from "react"
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import Results from "./Components/Results";

import { SiteContext } from "./Helpers/Contexts";

function App() {
  const [siteState, setSiteState] = useState("home");
  const [selected, setSelected] = useState([[]]);

  return (
    <div className="App">
      <h1>Survey</h1>
      <SiteContext.Provider value={{ selected, setSelected, siteState, setSiteState }}>
        {siteState === "home" && <Home />}
        {siteState === "quiz" && <Quiz />}
        {siteState === "results" && <Results />}
      </SiteContext.Provider> 
    </div>
  );
}

export default App;
