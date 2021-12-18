import React, { useContext } from "react"
import { SiteContext } from "../Helpers/Contexts";

function Results() {
  const { selected } = useContext(SiteContext);

  console.log(selected)

  // calculate results
  return (
    <div className="Results">
      <h1>Results</h1>
    </div>
  );
}

export default Results;
