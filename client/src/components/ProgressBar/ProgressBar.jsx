import React, { useContext, useState, useEffect } from "react";
// Component(s)
import StateContext from "../StateContext.jsx";
import DispatchContext from "../DispatchContext.jsx";
import ProgressFill from "./ProgressFill/ProgressFill.jsx";
// Style(s)
import "./progress-bar.scss";

function ProgressBar({ n, isPrevComplete, progressBarCompletion }) {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [percent, setPercent] = useState(progressBarCompletion);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const barHeight = Math.floor(100 / state.progressBars.length) + 20;

  useEffect(() => {
    let progressInterval = null;
    
    // if current bar is NOT completely loaded, and the previous bar IS completely loaded
    if (state.loading && isPrevComplete && !isFullyLoaded) {
      progressInterval = setInterval(() => {
        setPercent(prevProgress => {
          let newProgress = Math.round(prevProgress + (Math.random() * 30));
          if (newProgress > 100) newProgress = 100;
          return newProgress;
        });
      }, Math.random() * 1500);
    } else if (isFullyLoaded && progressInterval) clearInterval(progressInterval);
    
    return () => {
       if (progressInterval) clearInterval(progressInterval);
    };
  }, [state.loading, isFullyLoaded, isPrevComplete]);

  useEffect(() => {
    if (percent >= 100) setIsFullyLoaded(true);
    
    dispatch({ 
      type: "updateProgress", 
      value: { 
        i: n - 1, 
        percent 
      }
    });
  }, [percent]);

  return (
    <div className="progress-bar" style={{ height: barHeight + "px" }}>
      {/* <span>{`${progressBarCompletion}%`}</span> */}
      <ProgressFill barNumber={n} width={progressBarCompletion} />
    </div>
  );
}

export default ProgressBar;