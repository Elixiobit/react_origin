import { createElement, Component } from "react";
import "./app.css";
import styles from "./app.module.css";

export function App(props) {
  // можно делать деструктуризацию
  const { user, handleClick } = props;

  // инлайн стили/класические и цсс модули
  return (
    <div className={styles.app} style={{ border: "1px solid red" }}>
      <header onClick={props.handleClick} className="App-header">
        hello function
        <h1>name: {props.user.name}</h1>
      </header>
      {props.children}
    </div>
  );
}

/**
 * React element
 * {
      type: "div",
      props: {
        className: "App",
        children: {
          type: "header",
          props: { className: "App-header", children: "hello function" }
        }
      }
 * }
 */

// компонент без jsx
export const AppWitoutJSX = () =>
  createElement(
    "div",
    { className: "App" },
    createElement(
      "header",
      { className: "App -header" },
      "hello function AppWitoutJSX"
    )
  );

export class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 12,
    };
  }

  // state = {
  //   a: 12,
  // };

  render() {
    return (
      <div className="app">
        <header onClick={this.props.handleClick} className="App-header">
          hello class^ name: {this.props.user.name}
        </header>
      </div>
    );
  }
}
