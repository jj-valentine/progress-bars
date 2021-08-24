import React, { useContext, useState } from "react";
// Component(s)
import StateContext from "../../StateContext.jsx";
// Style(s)
import "./progress-fill.scss";

function ProgressFill({ barNumber, width }) {
  const state = useContext(StateContext);
  const [fillerColor, setFillerColor] = useState("#0f0");

  return <div className="filler" style={{ width: `${width}%`, backgroundColor: fillerColor, "--n": barNumber - 1, "--d": Math.round(360 / state.progressBars.length) }}></div>;
}

export default ProgressFill;