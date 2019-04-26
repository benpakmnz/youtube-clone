import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import './toolBar.scss';
import Logo from '../../logo';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'

class leftToolBar extends Component{
    render(){
            return(
        <div className="leftToolBar">
            <div onClick={this.props.changeDrawer}><IconsContainer className="icons" 
                        path={toolBarIcons.drawerIcon}
                        /></div>
            <Link to="/"><Logo alt="YouTube Home"/></Link>

        </div>
    )
    }

}


 const mapDispatchToProps = dispatch => {
    return{
        changeDrawer: () => dispatch(actionCreators.changeDrawerMode())
        
    }
  }



export default connect(null,mapDispatchToProps)(leftToolBar)
