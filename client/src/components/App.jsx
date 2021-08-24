import React from "react";
import { useImmerReducer } from 'use-immer';
// Component(s)
import StateContext from "./StateContext.jsx";
import DispatchContext from "./DispatchContext.jsx";
import ChooseBarsModule from "./ChooseBarsModule/ChooseBarsModule.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
// Style(s)
import "./app.scss";

function App() {
  const MAX_BARS = 10;

  const initialState = {
    buttonHover: false,
    progressBars: null,
    loading: false
  }

  function appReducer(draft, action) {
    const value = action.value;
    switch(action.type) {
      case "setNumberOfBars":
        draft.progressBars = Array(value || 1).fill({ percentComplete: 0 });
        break;
      case "setButtonHover": 
        draft.buttonHover = value;
        break;
      case "toggleLoadingStatus":
        draft.loading = !draft.loading;
        break;
      case "updateProgress":
        draft.progressBars[value.i].percentComplete = value.percent;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(appReducer, initialState);
 
  function triggerLoading(e) {
    e.preventDefault();
    dispatch({ type: "toggleLoadingStatus" });
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { state.progressBars === null && <ChooseBarsModule maxBars={MAX_BARS} /> }
          <div className="page-container">
            <button 
              style={{ backgroundColor: state.buttonHover ? "darkGray" : "#0f0" }}
              onClick={e => triggerLoading(e)} 
              onMouseEnter={() => dispatch({ type: "setButtonHover", value: true })}
              onMouseLeave={() => dispatch({ type: "setButtonHover", value: false })}
              disabled={
                state.progressBars === null || state.progressBars[state.progressBars.length - 1].percentComplete === 100
              }
            >
              Start/Stop Loading!
            </button>

            <div className="bars-container">
              { 
                state.progressBars && state.progressBars.map((pb, i) => {
                  return (
                    <ProgressBar 
                      key={i}
                      n={i + 1} 
                      isPrevComplete={i === 0 ? true : state.progressBars[i - 1].percentComplete === 100} 
                      progressBarCompletion={state.progressBars[i].percentComplete} />
                  )
                })
              }
            </div>
          </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;