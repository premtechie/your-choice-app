import React from 'react';
import Header from './Component/Header/Header'
import Home from './Component/Home/Home'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Womens from './Component/Womens/Womens'
import Kids from './Component/Kids/Kids'
import {Provider} from 'react-redux'
import store from './Component/redux/store'
import WishList from './Component/WishList/WishList';
import Product from './Component/ProductDetail/Product';
import Bag from './Component/Bag/Bag'
import Profile from './Component/Profile/Profile';
import UserDetails from './Component/Profile/UserDetails';
import Checkout from './Component/Checkout/Checkout';
function App() {
  return (
    <Provider store={store}>
        <Router  basename={`${process.env.PUBLIC_URL}/`}>
          <div className="App">
            <Header />
            {/* <Modal /> */}
            <Switch >
              <Route  path='/' exact component={Home} />
              <Route  path='/product' exact component={Product} />
              <Route  path='/womens' exact component={Womens} />
              <Route  path='/kids' exact component={Kids} />
              <Route path ='/wishlist' exact component={WishList} />
              <Route path ='/bag' exact component={Bag} />
              <Route path ='/profile' exact component={Profile} />
              <Route path='/profile/userprofile'exact component={UserDetails} />
              <Route path='/checkout' exact component={Checkout} />
            </Switch>
          </div>
        </Router>
    </Provider>
  );
}

export default App;
