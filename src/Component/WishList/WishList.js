import React,{Component} from 'react';
import './WishList.css'
import WishedProduct from './wishedProduct';
import {connect} from 'react-redux';
import {delete_Product, wishlistToBag} from '../ActionCreator/ProductActions'
import axios from '../Axios/data';

class WishList extends Component{
    state={
        data:[]
    }

    componentDidMount(){
        axios.get('/wishlist.json').
        then(response=>{
            const fetchedData=[];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    key:key
                })
            }
            this.setState({data:fetchedData})
        })
    }    

    render(){

        return (
            <div className='wishList'>
                <h4>WishList Products : </h4>
                {this.props.item.map(product=>(
                    <WishedProduct key={product.key} onAddToBagHandler={()=>this.props.onSendBag(product.id,product)} onDeleteHandler={()=>this.props.onDelete(product.id,product)}  productDetails={product} />
                ))}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        item:state.wishList
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onDelete:(id,data)=>dispatch(delete_Product(id,data)),
        onSendBag:(id,data)=>dispatch(wishlistToBag(id,data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(WishList)