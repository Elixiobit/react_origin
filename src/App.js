import { Component, PureComponent } from "react";

import styles from "./app.module.css";

export class App extends PureComponent {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.id = null;
    this.state = {
      counter: 0,
      // someProps: props,
    };

    // this.handClick = this.handClick.bind(this)
  }

  // state = {
  //   counter: 0,
  // };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props, state);
    // return {
    //   counter: 10,
    // };
    return state;
  }

  handClick = () => {
    console.log("click");
    this.setState(
      (state) => ({
        counter: state.counter + 1,
      }),
      () => console.log("updated", this.state)
    );
    // this.setState((state) => ({
    //   counter: state.counter + 2,
    // }));
    // this.setState((state) => ({
    //   counter: state.counter + 3,
    // }));
    // setTimeout(() => {
    //   unstable_batchedUpdates(() => {
    //     this.setState({
    //       counter: this.state.counter + 1,
    //     });
    // this.setState({
    //   counter: this.state.counter + 2,
    // });
    //     this.setState({
    //       counter: this.state.counter + 3,
    //     });
    //   });
    // }, 0);
    // setState(updater, [callback])
    // updater - {counter: 10} / (state) => ({counter: 10})
  };

  componentDidMount() {
    console.log("componentDidMount");
    // для выполнения запросов
    // для выполнения подписок
    // для таймеров
    // для работы с дом
    // для работы с рефами
    // можно вызывать setState

    this.id = setInterval(() => {
      this.handClick();
    }, 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextState, this.state);
    // if (nextState.counter <= 10) {
    //   return true;
    // }

    // return false;

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    return { id: "test" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
    // для выполнения запросов
    // для выполнения подписок
    // для таймеров
    // для работы с дом
    // для работы с рефами
    // // можно вызывать setState
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
  }

  componentWillUnmount() {
    // отписок
    // очистки таймеров
    // очистки еффектов
    console.log("componentWillUnmount");
    clearInterval(this.id);
  }

  render() {
    const { counter } = this.state;
    console.log("render", this);

    return (
      <div className={styles.app} key={1}>
        <header className="App-header">
          <h1>counter: {counter}</h1>
          <button onClick={this.handClick}>update</button>
          <button onClick={this.props.toggle}>toggle app</button>
        </header>
      </div>
    );
  }
}
