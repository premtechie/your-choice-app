import React from 'react';
import { connect } from 'react-redux';
import './ProductDetail.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { createProduct, decrementItem, increamentItem, selectedSize,addWishList,addToBag } from '../ActionCreator/ProductActions';
import data from '../Axios/data';

class Product extends React.Component{

    state={
        fetchedData:[]
    }
    getProductDetails(){
        let product = this.props.location.state;
        return product;
    }

    componentDidMount(){
        let productId = this.getProductDetails().id;
        this.props.createProduct(productId);
        const fetched=[]
        data.get('/wishlist.json').then(response=>{
            for(let key in response.data){
                fetched.push({
                    ...response.data[key],
                    key:key
                })
            }
            this.setState({fetchedData:fetched})
        })
    }

    getProduct(){
        let { prod } = this.props;
        let productId = this.getProductDetails().id;
        return prod[productId];
    }

    getProductCount=()=>{
        const product = this.getProduct();
        if(!product) return;
        return product.count;        
    }

    getSize(){
        const product = this.getProduct();
        if(!product) return;
        return product.size;
    }

    getPrice = (counter) => {
        return counter*this.props.location.state.price   
    }

    wishListHandler = () => {
        const product={
            url:this.props.location.state.url,
            size:this.getProduct().size,
            price:this.getPrice(this.getProductCount()),
            count:this.getProductCount(),
            brand:this.props.location.state.brand
        }
        if(this.getProduct().size && this.getProductCount()>0){
            data.post('/wishlist.json',product).then(response=>{
                alert('Sent To WishList')
                console.log(response.data)
            })
        }
        else{
            alert('select Size or Enter Product Count')
        }

    }
    bagHandler=()=>{
        const product={
            url:this.props.location.state.url,
            size:this.getProduct().size,
            price:this.getPrice(this.getProductCount()),
            count:this.getProductCount(),
            brand:this.props.location.state.brand
        }
        if(this.getProduct().size && this.getProductCount()>0){
            data.post('/bag.json',product).then(response=>{
                alert('Sent To Bag')
                console.log(response.data)
            })
        }
        else{
            alert('select Size or Enter Product Count')
        }
        
    }
    alertFunc=()=>{
        alert('Please Login')
        this.props.history.push('/profile')
    }

    render(){
        const productSize = this.props.location.state.size
        const brand = this.props.location.state.brand
        const url = this.props.location.state.url
        
        const id=this.getProductDetails().id
       //---------------------------------- 
        const data={
            url:this.props.location.state.url,
            size:this.getSize(),
            id:this.getProductDetails().id,
            price:this.getPrice(this.getProductCount()),
            count:this.getProductCount(),
            brand:this.props.location.state.brand
        }
        //----------------------------------------
        return (
            <div className='detail'>
                <div className='product'>
                    <div className='image'>
                        <img src={url} alt='' />
                    </div>
                    <div className='prod'>
                        <h2>{brand}</h2>
                        <h4>Price : {this.getPrice(this.getProductCount())}</h4>
                        <p>Select Size</p>
                        <div style={{ display: 'flex' }}>
                            {
                                productSize.map((s, index) => (
                                    <div onClick={() => this.props.onClickSize(id,s)} key={index} style={{ backgroundColor: 'whiteSmoke', padding: '10px', margin: '10px', cursor: 'pointer' }}>
                                        <div style={{ width: '35px', textAlign: 'center', fontSize: '13px', height: '20px' }}>{s}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='size'><strong>Selected Size : </strong>{this.getSize()}</div>
                        <div className='btn'>
                            <button className='bag' onClick={this.props.logged?()=>this.props.addBag(id,data):this.alertFunc}> <LocalMallIcon /> ADD TO BAG</button>
                            <button className='wishlist' onClick={this.props.logged?()=>this.props.addWishList(id,data,this.state.fetchedData):this.alertFunc} > <BookmarkBorderIcon /> ADD TO WISHLIST</button>
                        </div>
                        <div className='counter'>
                            <button onClick={this.getProductCount() ? () => this.props.onDecrement(this.getProductDetails().id) : null}>-</button>
                            <p>{this.getProductCount()}</p>
                            <button onClick={() => this.props.onIncrement(this.getProductDetails().id)}>+</button>
                        </div>
                        <div className='description'>
                            <p>100% Original Products</p>
                            <p>Free Delivery on order above Rs. 799</p>
                            <p>Pay on delivery might be available</p>
                            <p>Easy 30 days returns and exchanges</p>
                            <p>Try & Buy might be available</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        prod: state.productDetails,
        logged:state.logged

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickSize: (id,size) => dispatch(selectedSize(id,size)),
        onIncrement: (data) => dispatch(increamentItem(data)),
        onDecrement: (data) => dispatch(decrementItem(data)),
        createProduct : (data) => dispatch(createProduct(data)),
        addWishList:(id,data,existingProduct)=>dispatch(addWishList(id,data,existingProduct)),
        addBag:(id,data)=>dispatch(addToBag(id,data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);