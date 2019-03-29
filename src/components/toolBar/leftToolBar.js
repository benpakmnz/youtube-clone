import React, { Component } from 'react';
import IconsContainer from '../../assets/iconsContainer';
import toolBarIcons from '../../assets/iconsPath';
import './toolBar.scss';
import Logo from '../../logo';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'

class leftToolBar extends Component{
    render(){
            return(
        <div className="leftToolBar" onClick={this.props.changeDrawer}>
            <IconsContainer className="icons" 
                        path={toolBarIcons.drawerIcon}
                        />
            <Logo alt="YouTube Home"/>

        </div>
    )
    }

}


 const mapDispatchToProps = dispatch => {
    return{
        changeDrawer: () => dispatch(actionCreators.changeDrawerMode(false))
        
    }
  }



export default connect(null,mapDispatchToProps)(leftToolBar)
