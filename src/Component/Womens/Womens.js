import React,{Component} from 'react';
import './Womens.css';
import AliceCarousel from 'react-alice-carousel';
import image1 from '../../img/womens/image1.png'
import image2 from '../../img/womens/image2.png'
import ProductList from '../Home/ProductList';

const data=require('../Products.json');
const kurtis=data.womens.kurtis
const saree=data.womens.saree


export default class Womens extends Component{
    
    handler=(data)=>{
        this.props.history.push({pathname:'/product'},data);
    }
    transformProduct(obj){
        let result = [];
        for(let key in obj){
            let product = obj[key];
            product.id = key;
            result.push(product);
        }

        return result;
    }
    render(){
    return (
        <div className='womens'>
            <AliceCarousel autoPlay autoPlayInterval="3000" buttonsDisabled >
                <img src={image1} className="sliderimg" alt='' />
                <img src={image2} className="sliderimg" alt='' />
            </AliceCarousel>
            <ProductList title='Kurtis for Womens' products={this.transformProduct(kurtis)} handler={this.handler} />
            <ProductList title='Kurtis for Womens' products={this.transformProduct(saree)} handler={this.handler} />

        </div>
    )
}
}