import React, { Component, Fragment } from 'react';
import ToolBar from './components/toolBar/toolBar';
import Drawer from './components/drawer/drawer';
import './normalize.css';
import MoviesList from './components/moviesList/moviesList';

import { connect } from 'react-redux';


class App extends Component { 

  
  render() {
 
    return (
      <Fragment>
        <ToolBar/>
        {this.props.drawerMode? <Drawer/> : null}
        <main style={{height: '110vh', background:'#FAFAFA', paddingTop: 124,
                      width: this.props.drawerMode ? `calc(99vw - 240px)` : 'unset',
                      marginLeft: this.props.drawerMode ? 240 : 'unset'}}>
                      <MoviesList/>
                      <MoviesList/>
                      <MoviesList/>
                      <MoviesList/>
                      <MoviesList/>
        </main>
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
      drawerMode: state.drawerModeReducer.drawerMode
  }
}



export default connect(mapStateToProps)(App);
