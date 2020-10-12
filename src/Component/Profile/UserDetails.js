import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpUpdate,signOutUpdate } from '../ActionCreator/ProductActions';
import './UserDetails.css';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function UserDetails(props){
    const {onSignUp}=props

    useEffect(()=>{
        onSignUp()
        // const timeFunc=()=>{setTimeout(()=>props.history.push('/'),1000)}
        // timeFunc()
    },[])

    const signOutProfile=()=>{
        props.history.push('/profile')
        props.onSignOut()
    }
    console.log(props.show)
    console.log(props)

    return (
        <div className='userDetails'>
            <EmojiEmotionsIcon className='welcome-icon' />
            <h4>Welcome</h4>
            <button onClick={signOutProfile} >Sign out</button>
        </div>
    )
}

const mapStateToProps=state=>{
    return {
        show:state.logged
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSignUp:()=>dispatch(signUpUpdate()),
        onSignOut:()=>dispatch(signOutUpdate())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);