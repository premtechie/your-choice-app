import { CREATE_PRODUCT,INCREMENT_ITEM,DECREMENT_ITEM,
        SELECT_SIZE,ADD_TO_WISHLIST,DEL_ITEM, ADD_TO_BAG,
        REMOVE_ITEM,ADD_WISHLIST_TO_BAG,SIGN_IN_HANDLER, BAG_WISHLIST_CLEAR } from '../redux/actions';

export const createProduct = (data) =>{
    return {
        type : CREATE_PRODUCT,
        payload : data
    }
}

export const increamentItem = (data) =>{
    return {
        type : INCREMENT_ITEM,
        payload : data
    }
}

export const decrementItem = (data) =>{
    return {
        type: DECREMENT_ITEM,
        payload : data
    }
}

export const selectedSize = (id,size)=>{
    console.log(size)
    return {
        type: SELECT_SIZE,
        payload : {
            id:id,
            size:size
        }
    }
}

export const addWishList=(id,data,existingData)=>{
    return {
        type: ADD_TO_WISHLIST,
        payload:{
            id:id,
            product:data,
            existingProduct:existingData
        }
    }
}

export const addToBag=(id,data)=>{
    return{
        type:ADD_TO_BAG,
        payload:{
            id:id,
            data:data
        }
    }
}

export const delete_Product=(id,data)=>{
    return{
        type:DEL_ITEM,
        payload:{
            id:id,
            data:data
        }
    }
}

export const remove_Product=(id,data)=>{
    return {
        type:REMOVE_ITEM,
        payload:{
            id:id,
            data:data
        }
    }
}

export const wishlistToBag=(id,data)=>{
    return {
        type:ADD_WISHLIST_TO_BAG,
        payload:{
            id:id,
            data:data
        }
    }
}

export const signUpUpdate=()=>{
    return {
        type:SIGN_IN_HANDLER
    }
}
export const bagWishlistClear=()=>{
    return {
        type:BAG_WISHLIST_CLEAR
    }
}