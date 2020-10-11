import React,{Component} from 'react';
import './wishedProduct.css';

class WishedProduct extends Component{
    render(){
        return(
            <div className='wished'>
                <div className='wishedDetail'>
                    <img src={this.props.productDetails.url} alt='' />
                    <div className='priceDetails'>
                        <p><strong>Brand</strong> : {this.props.productDetails.brand}</p>
                        <p><strong>Price</strong> : {this.props.productDetails.price}</p>
                        <p><strong>Size</strong> : {this.props.productDetails.size}</p>
                        <p><strong>Quantity</strong> : {this.props.productDetails.count}</p>
                    </div>
                </div>
                <div className='bag-btn'>
                    <button onClick={this.props.onAddToBagHandler}>Move To Bag</button>
                    <button onClick={this.props.onDeleteHandler} style={{backgroundColor:'red',color:'white'}}>Remove</button>
                </div>
            </div>
        )
    }
}



export default WishedProduct
