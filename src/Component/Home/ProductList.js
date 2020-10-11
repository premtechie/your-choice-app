import React,{Component} from 'react';
import ProductItem from './ProductItem'
import Filter from '../Filter/Filter';
import { Const } from '../Constant/Const';
export default class ProductList extends Component{

    constructor(props){
        super(props)
        this.state={
            products:this.props.products
        }
    }
    
    sortProduct=(filterState)=>{
        let {products}=this.state;
        const originalProducts=this.props.products;
        if(filterState!==Const.filterState.NONE){
            products.sort((a,b)=>{
                if(filterState===Const.filterState.LOWEST){
                    return a.price - b.price;
                }
                else if(filterState===Const.filterState.HIGHEST){
                    return b.price - a.price;
                }  
            })
        }
        else{
            products=originalProducts;
        }
        
        this.setState({
            products:products
        })
    }

    sortHandler=(value)=>{
        this.sortProduct(value)
    }
    pushHandler=(value)=>{
        this.props.handler(value)
    }

    render(){
        return(
            <div style={{borderBottom:'2px solid #ccc'}}>
                <div style={{textAlign:'start',margin:'10px',padding:'0 25px'}}><h2>{this.props.title}</h2></div>
                <Filter sort={this.props.sort} sortHandler={this.sortHandler} />
                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                    {
                        this.props.products.map((product,index)=><ProductItem key={index} data={product} productHandler={()=>this.pushHandler(product)} />)
                    }
                </div>
            </div>
        );
    }
}