import React, { Component } from 'react';
import ToolBar from './components/toolBar/toolBar';
import Drawer from './components/drawer/drawer';
import { BrowserRouter, Route } from 'react-router-dom';
import './normalize.css';
import Watch from './components/watch/watch'
import Main from './components/main/main';
import * as actionCreators from './store/actions/index'

import { connect } from 'react-redux';


class App extends Component { 

  componentDidMount(){
    this.props.setMoviesList()  
  }

  render() {
    return (
      <BrowserRouter basename= {window.location.pathname}>
        <ToolBar/>
        {this.props.drawerMode? <Drawer/> : null}
        
        <Route path="/" exact render={()=> <Main drawerMode={this.props.drawerMode}/>}/>
        <Route path={ "/watch/:id"} render={()=> <Watch/>}/> 
      </BrowserRouter>


    );
  }
}


const mapStateToProps = state => {
  return {
      drawerMode: state.drawerModeReducer.drawerMode,
      movieList: state.fetchMoviesReducer.fetchMoviesReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setMoviesList: () => dispatch(actionCreators.initMovies())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
