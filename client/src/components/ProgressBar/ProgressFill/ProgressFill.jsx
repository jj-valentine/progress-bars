import React, { useState } from "react";
// Style(s)
import "./progress-fill.scss";

function ProgressFill({ barNumber, width }) {
  const [fillerColor, setFillerColor] = useState("#0f0");

  return <div className="filler" style={{ width: `${width}%`, backgroundColor: fillerColor, "--n": barNumber - 1}}></div>;
}

export default ProgressFill;