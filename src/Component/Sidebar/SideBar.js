import React from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import './SideBar.css';
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

function sideBar(props){

    return(
        <div className='sideBar'>

            <Link to='/' style={{color:'black',textDecoration:'none'}} ><div className='Menu' onClick={props.showHandler}>Mens</div></Link>
            <Link to='/womens' style={{color:'black',textDecoration:'none'}} ><div className='Menu' onClick={props.showHandler}>Womens</div></Link>
            <Link to='kids' style={{color:'black',textDecoration:'none'}} ><div className='Menu' onClick={props.showHandler}>Kids</div></Link>
            
            <Route render={({history})=>(
                <div className='icon' onClick={!props.logged?()=>{
                    history.push('/profile')
                    props.showHandler()
                    }:
                    ()=>{
                        history.push('/profile/userprofile')
                        props.showHandler()
                    }}>
                    <PermIdentityIcon />
                    <p>Profile</p>
                </div>
            )}
            
            />

            
            
            <Link to='/wishlist' style={{color:'black',textDecoration:'none'}}>
                <div className='icon' onClick={props.showHandler}>
                    <BookmarkBorderIcon />
                    <p>WishList</p>
                </div>
            </Link>
            
            <Link to='/bag' style={{color:'black',textDecoration:'none'}}>
                <div className='icon' onClick={props.showHandler}>
                    <LocalMallIcon />
                    <p>Bag</p>
                </div>
            </Link>
            
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        logged:state.logged
    }
}


export default connect(mapStateToProps)(sideBar);