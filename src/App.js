import React from "react";
import HackerNews from "./HackerNews";
import EventSandbox from "./EventSandbox";
import "./styles.css";

const App = () => (
  <>
    <h1 data-testid="header-main">Cypress Sandbox</h1>

    <HackerNews />

    <EventSandbox />
  </>
);

export default App;
