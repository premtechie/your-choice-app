import React, { useState } from 'react';
import './Checkout.css';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import TextError from '../Profile/TextError'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import {bagWishlistClear} from '../ActionCreator/ProductActions'

function Checkout (props){
    const orderItems=props.location.state;
    console.log(props.location.state.map(a=>a.brand));
    console.log(orderItems)

    const getPrice=()=>{
        let totalPrice=0;
        props.location.state.map(a=>{
            totalPrice +=a.price
        })
        return totalPrice        
    }

    const initialValues={
        name:'',
        payment:'cod',
        address:'',
        phone:''
    }
     const validate=values=>{
        let errors={}
        if(!values.name){
            errors.name='Required'
        }
        else if(values.name.length<4){
            errors.name='Name should be above four character'
        }
        if(!values.payment){
            errors.payment='Required'
        }
        if(!values.address){
            errors.address='Required'
        }
        if(!values.phone){
            errors.phone='Required'
        }
        else if(values.phone.length<10){
            errors.phone='enter valid number'
        }
        return errors
     }

    const [show, showHanlder]=useState(false)

    const onCheckoutHandler=values=>{
        console.log('OrderDetails : ', values)
        alert('order placed successfully')
        showHanlder(true);
        props.onClearHandler()
        let timeFunc = setTimeout(()=>props.history.push('/'),2000)
        return timeFunc; 
    }


    return (
        <div className='checkout'>
            {!show?<Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onCheckoutHandler}
            >
                <Form className='billing'>
                    <div className='payment' >
                        <h4>Payment Method</h4>
                        <Field as='select' name='payment' >
                            <option value='cod' >Cash On Delivery</option>
                            <option value='upi' >UPI</option>
                            <option value='card' >Credit/Debit Card</option>
                        </Field>
                    </div>
                    <div className='personal-detail'>
                        <h4>Personal Details</h4>
                        <label>Full Name</label>
                        <Field type='text' name='name' />
                        <ErrorMessage name='name' component={TextError} />
                        <label>Address</label>
                        <Field type='textarea' name='address' />
                        <ErrorMessage name='address' component={TextError} />
                        <label>Mobile Number</label>
                        <Field type='text' name='phone' />
                        <ErrorMessage name='phone' component={TextError} />
                    </div>
                    <div className='order-summery'>
                        <h4>Order Summery</h4>
                        {
                            orderItems.map(item=>(
                                <div key={item.id} className='item' >
                                    <img  src={item.url} alt='' />
                                    <div className='item-details'>
                                        <p>Brand : {item.brand}</p>
                                        <p>Price : {item.price}</p>
                                        <p>Count : {item.count}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <p className='prod-price'>Price :{getPrice()}</p>
                    </div>
                <button>Place Order</button>
                </Form>
            </Formik>:
            <div className='success-msg'>
                <FavoriteIcon style={{fontSize:'70px',color:'red'}} />
                <h4>Thankyou for Shopping with us</h4>
            </div>
            }
        </div>
    )
}

const mapDispatchToProps=dispatch=>{
    return {
        onClearHandler:()=>dispatch(bagWishlistClear())
    }
}


export default connect(null,mapDispatchToProps)(Checkout);