import React, { Component } from 'react';
import { Provider } from "react-redux";
import GamePageContainer from "./redux/GamePageContainer"
import setupStore from "./redux/setupStore";
const store = setupStore();

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <GamePageContainer/>
        </Provider>
    );
  }
}