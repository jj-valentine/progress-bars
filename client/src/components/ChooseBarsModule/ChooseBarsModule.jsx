import React, { useContext, useState } from "react";
// Component(s)
import DispatchContext from "../DispatchContext.jsx";
// Style(s)
import "./choose-bars-module.scss";

function ChooseBarsModule({ maxBars }) {
  const dispatch = useContext(DispatchContext);

  const [chosenNumber, setChosenNumber] = useState(1);

  function handleChangeNumber(e, deltaN) {
    e.preventDefault();
    if ((chosenNumber > 1 && deltaN < 0) || (chosenNumber < maxBars && deltaN > 0)) setChosenNumber(prevNum => prevNum + deltaN);
  }

  return (
    <div className="choose-bars-module">
      <div>
        <button onClick={e => handleChangeNumber(e, -1)}>{"-"}</button>
        <span>{chosenNumber}</span>
        <button onClick={e => handleChangeNumber(e, 1)}>{"+"}</button>
      </div>
      <button onClick={() => dispatch({ type: "setNumberOfBars", value: chosenNumber })}>Let's Go!</button>
    </div>
  );
}

export default ChooseBarsModule;