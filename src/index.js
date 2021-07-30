import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AppHooks } from "./app-hooks";

class Test extends React.Component {
  state = {
    isVisible: true,
  };

  toggle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const { isVisible } = this.state;

    return (
      <div>
        <button onClick={this.toggle}>toggle</button>
        {isVisible && <App toggle={this.toggle} />}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <AppHooks />
  </React.StrictMode>,
  document.getElementById("root")
);
