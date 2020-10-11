import React,{Component} from 'react';
import './Kids.css';
import AliceCarousel from 'react-alice-carousel';
import image1 from '../../img/Kids/image1.png'
import image2 from '../../img/Kids/image2.png'
import ProductList from '../Home/ProductList';

const data=require('../Products.json');
const tShirt=data.kids.tShirt
const pant=data.kids.pants


export default class Kids extends Component{

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
        <div className='kids'>
            <AliceCarousel autoPlay autoPlayInterval="3000" buttonsDisabled >
                <img src={image1} className="sliderimg" alt='' />
                <img src={image2} className="sliderimg" alt='' />
            </AliceCarousel>
            <ProductList title='T-Shirts for Kids' products={this.transformProduct(tShirt)} handler={this.handler} />
            <ProductList title='T-Shirts for Kids' products={this.transformProduct(pant)} handler={this.handler} />
        </div>
    )
    }
}