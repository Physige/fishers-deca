import React, { useContext } from "react"
import { SiteContext } from "../Helpers/Contexts";

function Home() {
  const { siteState, setSiteState } = useContext(SiteContext)
  return (
    <div>
      <h1>Home</h1>
      <button 
        onClick={() => {
          setSiteState("quiz");
        }}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
