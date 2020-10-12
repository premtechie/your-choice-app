import * as actionTypes from './actions';
import data from '../Axios/data'

const initialState={
    open:false,
    productDetails:{
    },
    wishList:[],
    bag:[],
    logged:false

}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'OPEN':
            return{
                ...state,
                open:!state.open
            }
        case actionTypes.CREATE_PRODUCT:
            return createProduct(state,action);
        case actionTypes.INCREMENT_ITEM :
            return increamentProduct(state,action);
        
        case actionTypes.DECREMENT_ITEM:
            return decrementProduct(state,action)
        
        case actionTypes.SELECT_SIZE:
            return selectProductSize(state,action) 
        case actionTypes.ADD_TO_WISHLIST:
            return wishListProduct(state,action)
        case actionTypes.DEL_ITEM:
            return deleteItem(state,action)    
        case actionTypes.ADD_TO_BAG:
            return bagProduct(state,action)
        case actionTypes.REMOVE_ITEM:
            return removeItem(state,action)
        case actionTypes.ADD_WISHLIST_TO_BAG:
            return addWishlistToBag(state,action)
        case actionTypes.SIGN_IN_HANDLER:
            return signUpHandler(state,action)
        case actionTypes.BAG_WISHLIST_CLEAR:
            return bagWishListHandler(state,action)
        case actionTypes.SIGN_OUT_HANDLER:
            return signOutHandler(state,action)
        default:
            return state
    } 
    
}

const increamentProduct = (state,action) => {
    let productDetails = {
        ...state.productDetails
    };
    const productId = action.payload;
    let product = productDetails[productId];
    product.count += 1;
    return {
        ...state,
        productDetails
    }
}

const selectProductSize = (state,action) => {
    let productDetails = {
        ...state.productDetails
    };
    const productId=action.payload.id;
    let product = productDetails[productId]
    product.size=action.payload.size
    return {
        ...state,
        productDetails
    }

}

const decrementProduct=(state,action)=>{
    let productDetails={
        ...state.productDetails
    }
    const productId=action.payload;
    let product=productDetails[productId];
    product.count -=1;
    return {
        ...state,
        productDetails
    }

}


const createProduct=(state,action)=>{
    let productDetails=state.productDetails
    let payload = action.payload;
    return {
        ...state,
        productDetails : {
            [payload] : {
                count : 1,
                size : ''
            }
        }
    }
}

function wishListProduct(state,action){
    const newProduct=action.payload.product;
    const existingUser=state.wishList
    const prod=existingUser.some(user=>user.id===newProduct.id)
    const fetchedProduct=action.payload.existingProduct
    const fetched=[]
    if(!newProduct.size){
        alert('Please Select Size')
    }
    else{
        if(!prod){
           existingUser.push(newProduct)
           alert('product Sent')
        }
        else{
            alert('alredy WishListed')
        }
    }
    console.log('[wishList Product] : ',prod,fetched)
    return {
        ...state,
        wishlist:existingUser
    }
}
const bagProduct=(state,action)=>{
    let existingUser=state.bag
    const newProduct=action.payload.data;
    
    const prod=existingUser.some(user=>user.id===newProduct.id)

    if(!newProduct.size){
        alert('Please Select Size')
    }
    else{
        if(!prod){
            existingUser.push(newProduct)
        alert('Product Successfully Sent')

        }
        else{
            alert('alredy Bagged')
        }
    }
    return {
        ...state,
        bag:existingUser
    }

}




const deleteItem=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.wishList.filter(item=>item.id!==newItem.id);
    
    return {
        ...state,
        wishList:existingItem
    }
}
const removeItem=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.bag.filter(item=>item.id!==newItem.id);
    
    return {
        ...state,
        bag:existingItem
    }
}

const addWishlistToBag=(state,action)=>{
    let newItem=action.payload.data
    let existingItem=state.wishList.filter(item=>item.id!==newItem.id);
    let bagProduct=state.bag
    const newProduct=action.payload.data;
    
    const prod=bagProduct.some(user=>user.id===newProduct.id)
    if(!prod){
        bagProduct.push(newItem)
    }
    else{
        alert('already Bagged !')
    }

    return {
        ...state,
        wishList:existingItem,
        bag:bagProduct
    }
}

const signUpHandler=(state,action)=>{
    return{
        ...state,
        logged:!state.logged
    }
}

const bagWishListHandler=(state,action)=>{
    return {
        ...state,
        wishlist:[],
        bag:[]
    }
}

const signOutHandler=(state,action)=>{
    return{
        ...state,
        logged:!state.logged
    }
}

export default reducer;