import React,{Component} from 'react';
import './Bag.css'
import BaggedProduct from './BaggedProduct';
import data from '../Axios/data';
import {connect} from 'react-redux'
import { remove_Product } from '../ActionCreator/ProductActions';

class Bag extends Component{
    constructor(props){
        super(props)
        this.state={
           data:[],
           price:0
        }
    }

    componentDidMount(){
        const fetchedResult=[]
        data.get('/bag.json').then(response=>{
            for(let key in response.data){
                fetchedResult.push({
                    ...response.data[key],
                    id:key
                })
            }
            this.setState({data:fetchedResult})
            console.log(this.state.data)
        })
    }
    pricehandler(){
        let totalPrice=0;
        
        this.props.item.map(user=>{
            totalPrice+=user.price
        })
        return totalPrice;
    }
    checkoutHandler=()=>{
        const data=this.props.item
        this.props.history.push('/checkout',data,this.pricehandler())
    }
    render(){
        console.log(this.props)
        return (
            <div className='wishList'>
                {this.props.item.map(product=>(
                    <BaggedProduct key={product.id} removeHandler={()=>this.props.onDelete(product.id,product)}  productDetails={product} />
                ))}
                <p className='price'><strong>Total Price:  </strong>{this.pricehandler()} </p>
                {this.props.item.length>0?<div>
                    <button onClick={this.checkoutHandler} className='checkout'>Check Out</button>
                </div>:null}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        item:state.bag
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onDelete:(id,data)=>(dispatch(remove_Product(id,data)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bag)