import React,{Component} from 'react';
import './Home.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../../img/Slider/image1.png';
import image2 from '../../img/Slider/image2.png';
import image3 from '../../img/Slider/image3.png';
import image4 from '../../img/Slider/image4.png';
import image5 from '../../img/Slider/image5.png';
import ProductList from './ProductList';


const data=require('../Products.json');
const tees=data.mens.tShirt;
const pant=data.mens.pants;
const shirt=data.mens.shirt


export default class Home extends Component {

    

    handler=(data)=>{
        this.props.history.push({pathname:'/product'},data);
    }
    sortProducts=(event)=>{
        const {t_Shirt}=this.state;
        const sort=event.target.value
        this.setState({
            t_Shirt:{...t_Shirt,sort:sort,value:
                Object.values(this.state.t_Shirt.value).map(prod=>prod).slice().sort((a,b)=>
                sort==='Lowest' ?a.price>b.price?1:-1
                :sort==='Highest'?a.price<b.price?1:-1:this.state.sort
            )
            }
        })
    } 
    //----------------------------------------------------
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
        <div className='home'>
            <AliceCarousel autoPlay autoPlayInterval="3000" buttonsDisabled>
                <img src={image1} className="sliderimg" alt=''/>
                <img src={image2} className="sliderimg" alt=''/>
                <img src={image3} className="sliderimg" alt=''/>
                <img src={image4} className="sliderimg" alt=''/>
                <img src={image5} className="sliderimg" alt=''/>
            </AliceCarousel>
            <ProductList title='T-Shirts for men' products={this.transformProduct(tees)} handler={this.handler} />
            <ProductList title='Jeans for men'  products={this.transformProduct(pant)}  handler={this.handler}/>
            <ProductList title='Shirts for men' products={this.transformProduct(shirt)}  handler={this.handler} />
        </div>

    )
}

    }