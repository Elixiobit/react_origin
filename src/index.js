import React from "react";
import ReactDOM from "react-dom";
import { App, AppClass, AppWitoutJSX } from "./App";

const user = { name: "test" };
const handleClick = () => {
  console.log("click");
};

ReactDOM.render(
  <React.StrictMode>
    <App user={user} handleClick={handleClick}>
      <h1>children app</h1>
    </App>
    <AppClass user={user} handleClick={handleClick} />
    <AppWitoutJSX />
  </React.StrictMode>,
  document.getElementById("root")
);
