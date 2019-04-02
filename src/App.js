import React, { Component, Fragment } from 'react';
import ToolBar from './components/toolBar/toolBar';
import Drawer from './components/drawer/drawer';
import './normalize.css';
import MoviesList from './components/moviesList/moviesList';
import * as actionCreators from './store/actions/index'

import { connect } from 'react-redux';


class App extends Component { 

  componentDidMount(){
    this.props.setMoviesList()
  }
  render() {
    return (
      <Fragment>
        <ToolBar/>
        {this.props.drawerMode? <Drawer/> : null}
        <main style={{background:'#FAFAFA', boxSizing: 'border-box',
                      width: this.props.drawerMode ? `calc(100vw - 240px)` : '100vw',
                      display:'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 0,
                      top: 56,
                      padding: this.props.drawerMode ? '1px 128px' : '1px 36px'}}>
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
