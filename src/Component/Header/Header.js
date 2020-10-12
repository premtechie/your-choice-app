import React,{Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';
import {Link,useHistory,withRouter} from 'react-router-dom';
import {Fragment} from 'react'
import SideBar from '../Sidebar/SideBar'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import logo from '../../img/logo/yourchoice.png';
import Backdrop from '../backdrop/Backdrop';

function Header(props){
    
    const {logged}=props
    return  (
        <Fragment>
        <div className='header'>
            <div className='content-1'>
                <div className='logo'>
                    <Link to='/' >
                        <img src={logo} alt='' />
                    </Link>
                </div>
                <div className='catagory'>
                    <Link to='/' style={{color:"black",textDecoration:'none'}}><p>Mens</p></Link>
                    <Link to='/womens' style={{color:"black",textDecoration:'none'}}><p>Womens</p></Link>
                    <Link to='/kids' style={{color:"black",textDecoration:'none'}}><p>Kids</p></Link>
                </div>
            </div>
            <div className='content-2'>
                
                <Route render={({history})=>(
                    <div className='profile' onClick={props.logged ?()=>history.push('/profile/userprofile') :()=>history.push('/profile') }>
                        <PermIdentityIcon />
                        <p>Profile</p>
                    </div>
                )} />

                <Link to='/wishlist' style={{color:"black",textDecoration:'none'}} >
                    <div className='profile' >
                        <BookmarkBorderIcon />
                        <p>WishList</p>
                    </div>
                </Link>
                    
                <Link  to='/bag' style={{color:"black",textDecoration:'none'}}>
                    <div className='profile'>
                        <LocalMallIcon />
                        <p>Bag</p>
                    </div>
                </Link>
                <div className='menu' onClick={props.onShow}>
                    <MenuIcon />
                </div>
            </div>
        </div>
        {
            props.show ? <Backdrop showHandler={props.onShow}  /> : null
        }
    
        {
            props.show ? <SideBar showHandler={props.onShow} /> :null
        }
        </Fragment>
    )

}

const mapStateToProps=state=>{
    return {
        show:state.open,
        logged:state.logged
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onShow:()=>dispatch({type:'OPEN'})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);