import React, { useReducer } from "react";

const initialState = {
  logs: []
};

function reducer(state, action) {
  switch (action.type) {
    case "prepend":
      return { logs: [action.log, ...state.logs.slice(0, 4)] };
    default:
      return state;
  }
}

const EventSandbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onKeyUp = evt => {
    dispatch({ type: "prepend", log: `KeyUp code: ${evt.keyCode}` });
  };

  const onBlur = () => {
    dispatch({ type: "prepend", log: "Input blurred" });
  };

  const onFocus = evt => {
    dispatch({ type: "prepend", log: "Input focused" });
  };

  return (
    <>
      <h2>Event Sandbox</h2>

      <div className="es">
        <div className="es__capture">
          <input
            className="es__input"
            placeholder="Interact here"
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
          />
        </div>
        <div className="es__logs">
          {state.logs.map((log, i) => (
            <div key={i} className="es__log">
              {log}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventSandbox;
