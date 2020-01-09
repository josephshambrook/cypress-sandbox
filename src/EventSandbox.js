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

const padNum = (num) => `${num}`.length === 1 ? `0${num}` : num;

function getTime() {
  const date = new Date();
  return `${padNum(date.getHours())}:${padNum(date.getMinutes())}:${padNum(date.getSeconds())}`;
}

const EventSandbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const newLog = (msg) => dispatch({ type: "prepend", log: `${getTime()} - ${msg}` });
  const onKeyUp = evt => newLog(`Keyup code: ${evt.keyCode}`);
  const onBlur = () => newLog("Input blurred");
  const onFocus = () => newLog("Input focused");

  return (
    <>
      <h2>Event Sandbox</h2>

      <div className="es">
        <div className="es__capture">
          <input
            className="es__input"
            data-testid="es-input"
            placeholder="Interact here"
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
          />
        </div>

        <div className="es__logs" data-testid="es-logs">
          {state.logs.map((log, i) => (
            <div key={i} className="es__log" data-testid="es-log">
              {log}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventSandbox;
