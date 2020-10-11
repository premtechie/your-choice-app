import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpUpdate } from '../ActionCreator/ProductActions';
import './UserDetails.css';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function UserDetails(props){
    const {onSignUp}=props

    useEffect(()=>{
        onSignUp()
        const timeFunc=()=>{setTimeout(()=>props.history.push('/'),1000)}
        timeFunc()
    },[])

    
    console.log(props.show)
    console.log(props)

    return (
        <div className='userDetails'>
            <EmojiEmotionsIcon className='welcome-icon' />
            <h4>Welcome</h4>
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
        onSignUp:()=>dispatch(signUpUpdate())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);