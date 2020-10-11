import React,{Component} from 'react';
import './ProjectItem.css'

export default class ProductItem extends Component{
    render(){
        return(
            <div className='card' onClick={this.props.productHandler} >
                <img style={{width:'90%'}} src={this.props.data.url} alt='' />
                <div>
                    <p>Brand : {this.props.data.brand}</p>
                    <p>Price : {this.props.data.price}</p>
                </div>
            </div>
        )
    }
}