import React,{Component} from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import './Profile.css'
import data from '../Axios/data'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import TextError from './TextError';
import axios from 'axios'


class Profile extends Component{
    state={
        login:false,
        show:true,
        fetchedUserData:[]
    }    

    loginHandler=()=>{
        this.setState({login:true})
    }
    signUpHandler=()=>{
        this.setState({login:false})
    }
    
    componentDidMount(){
        data.get('/userDetails.json').then(response=>{
            let d=[]
            for(let key in response.data){
                d.push(response.data[key])
            }
            this.setState({
                fetchedUserData:d
            })
            console.log(d.map(a=>a))
        })
    }

    render(){
        let username='prem';

        const initialValues={
            username:'',
            email:'',
            password:'',
            rePassword:''
        }
        const validate=values=>{
            let errors={}
            const fetchedUserData=this.state.fetchedUserData;

            const userNameValidate=fetchedUserData.some(user=>user.username===values.username)
            const emailValidate=fetchedUserData.some(user=>user.email===values.email)

            let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(!values.username){
                errors.username='Required'
            }
            else if(values.username.length<5){
                errors.username='username must above 5 character'
            }
            else if(userNameValidate){
                errors.username='user alredy exist'
            }
            if(!values.email){
                errors.email='Required'
            }
            else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
                errors.email = 'Invalid format'
            }
            else if(emailValidate){
                errors.email='email already exist'
            }
            if(!values.password){
                errors.password='Required'
            }
            else if(!values.password.match(passw)){
                errors.password='password between 6 to 20 characters & one numeric digit, one uppercase and one lowercase'
            }
            if(values.password!==values.rePassword){
                errors.rePassword='Password does not match'
            }
            return errors;
        }
        const onSubmit=values=>{
            console.log('values',values)
            // alert(values.email)
            this.setState({show:false})
            username=values.email
            let data={...values}
            this.props.history.push('/profile/userprofile',data)
            localStorage.setItem('document',JSON.stringify(data))
            axios.post('https://shine-b55d9.firebaseio.com/userDetails.json',values).then(response=>{
                console.log(response)
            })
        }

        // -------------------------login----------------------------------
        const loginInitialValues={
            email:'',
            password:'',
        }
        const loginValidate=values=>{
            let errors={}
            const fetchedUserData=this.state.fetchedUserData;
            const emailValidate=fetchedUserData.some(user=>user.email===values.email && user.password === values.password );

            if(!values.email){
                errors.email='Required'
            }
            else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
                errors.email = 'Invalid format'
            }
            if(!values.password){
                errors.password='Required'
            }
            else if(!emailValidate){
                errors.password='Email & Password doesnot match'
            }
            return errors;
        }
        const loginSubmit=values=>{
            console.log('values',values)
            this.setState({show:false})
            let data={...values}
            this.props.history.push('/profile/userprofile',data)
        }



        return(
            <div className='pro'>
                    <PermIdentityIcon style={{fontSize:'50px',padding:'5px',color:'gray',borderRadius:'50%',border:'1px solid gray'}} />
                    {!this.state.login && this.state.show?<div className='register'>
                        <Formik
                            initialValues={initialValues}
                            validate={validate}
                            onSubmit={onSubmit}
                        >
                            <Form className='oldProfile'>
                                <Field type='text' id='username' name='username' placeholder='Enter Username' />
                                <ErrorMessage name='username' component={TextError} />
                                <Field type='email' id='email' name='email' placeholder='Enter Email' />
                                <ErrorMessage name='email' component={TextError} />
                                <Field type='password' id='password' name='password' placeholder='Enter Password'/>
                                <ErrorMessage name='password' component={TextError}/>
                                <Field type='password' id='rePassword' name='rePassword' placeholder='Confirm Password'/>
                                <ErrorMessage name='rePassword' component={TextError}/>
                                <button type='submit'>Sign up</button>
                                <p onClick={this.loginHandler}>Already have account ? <a href='#'>Login</a></p>
                            </Form>
                        </Formik>
                    </div>:
                    this.state.login && this.state.show ?
                    <div className='register'>
                        <Formik
                            initialValues={loginInitialValues}
                            validate={loginValidate}
                            onSubmit={loginSubmit}
                        >
                            <Form className='oldProfile'>
                                <Field type='email' id='email' name='email' />
                                <ErrorMessage name='email' component={TextError} />
                                <Field type='password' id='password' name='password' />
                                <ErrorMessage name='password' component={TextError}/>
                                <button type='submit'>Login</button>
                                <p onClick={this.signUpHandler}>New User ? <a href='#'>Sign up</a></p>
                            </Form>
                        </Formik>
                    </div>:
                    <div>
                        <p>{username}</p>
                    </div>
                    }
            </div>
        )
        
    }
}


export default Profile;
