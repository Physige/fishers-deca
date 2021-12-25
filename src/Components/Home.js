import React, { useContext } from "react"
import { SiteContext } from "../Helpers/Contexts";
import ClearButton from "./Buttons/ClearButton";
import OrangeButton from "./Buttons/OrangeButton";

function Home() {
  const { setSiteState } = useContext(SiteContext)
  return (
    <div className="h-[92vh] w-[100vw] bg-gradient-to-r from-blue-500 to-blue-800">
      <div className="md:text-left text-center md:justify-start justify-center md:w-[60vw] p-[10vw]">
        <div className="text-white font-bold md:text-6xl py-5 pt-32 text-5xl">CHOOSING A PROJECT</div>
        <div className="text-white text-xl py-5">With so many projects, choosing one can be hard. Let us help! Project topics can range from marketing, business administration, finance, and hospitality. By answering a few questions, we can help you find the perfect match!</div> 
        <div className="md:flex pt-8">
          <div className="md:pr-4">
            <OrangeButton label="TAKE THE QUIZ" handleClick={() => { setSiteState("quiz"); }}/>
          </div>
          <div className="md:pl-4 md:pt-0 pt-8">
            <ClearButton label="SEE ALL EVENTS" handleClick={() => { window.location.href = "https://www.deca.org/high-school-programs/high-school-competitive-events/"; }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
