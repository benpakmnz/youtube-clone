import React, { Component, Fragment } from 'react';
import './App.css';
import ToolBar from './components/toolBar/toolBar';
import './normalize.css';


class App extends Component {
  render() {
    return (
      <Fragment>
        <ToolBar/>
        <main style={{height: '110vh', background:'#FAFAFA'}}></main>
      </Fragment>
    );
  }
}

export default App;
