import {createStore} from 'redux';
import Reducer from './Reducer'

const store=createStore(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(()=>{
//     console.log('[Subscribe]',store.getState())
// })

export default store;