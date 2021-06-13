
import './App.css';
import Login from './Component/Login'
import Register from './Component/Register'
import Slider from './Component/Slider'
import Navbar from './Component/Navbar'
import Products from './Component/Products'
import Footer from './Component/Footer'
import About from './Component/About'
import Checkout from './Component/Checkout'
import Contact from './Component/Contact'
import React, { useEffect, useState } from 'react'
import ProductDetail from './Component/ProductDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [product, setProduct] = useState([])
  const API = "http://localhost:1337/Products";
  useEffect(() => {

    fetch(API)
      .then((response) => response.json())
      .then(data => {
        setProduct(data);
      });
  }, []);

  const onSearch = (search) => {
    fetch(`${API}?title_containss=${search}`)
      .then(response => response.json())
      .then(data => {
        product.filter(product => product.tilte === search);
        setProduct(data)
        console.log(data)
      });
  }
  const onPriceUp = () => {
    fetch(`${API}?_sort=price:ASC`)
      .then(response => response.json())
      .then(data => {
        setProduct(data)
        console.log(data)
      });
  }

  const onPriceDown = () => {
    fetch(`${API}?_sort=price:DESC`)
      .then(response => response.json())
      .then(data => {
        setProduct(data)
        console.log(data)
      });
  }
  const ongetValue = (a) => {
    fetch(`${API}?categoryID=${a}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data)

        console.log(data)
      }, console.log(product));
  }

  const localStorageProduct = JSON.parse(localStorage.getItem('cart'))
  const [cart, setCart] = useState(localStorageProduct);
  const newCart = [...cart];
  const onremoveCart = (cartID) => {
    console.log(cartID)
    setCart(
      cart.filter((Cart) => Cart.id !== cartID)
    )
  };

  const onAddToCart = (productCart) => {
    let itemCart = newCart.find((item) => productCart.id === item.id);

    if (itemCart) {
      itemCart.quantity++;
    } else {
      itemCart = {
        ...productCart,
        quantity: 1,
      }
      newCart.push(itemCart);
    }
    setCart([
      ...newCart]);
  }

  const onGetQuantity = (product, amount) => {
    console.log(amount)
    const newCart1 = [...cart];
    newCart.find(
      ((item) => product.id === item.id)).quantity = amount;
    setCart(newCart1);
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }, [newCart]);

  const localStorageName = JSON.parse(localStorage.getItem('username'))
  const [username, setUsername] = useState(localStorageName);

  const ongetUser = (user) => {
    setUsername(user.username);
    console.log(username)
  }

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  const onLogout = () => {
    setUsername(null);
    setCart([]);
  }

  return (
    <>
      <Router>


        <Navbar getCart={cart} getUsername={username} Logout={onLogout} />

        <Slider />
        <Switch>
          <Route exact path="/">
            <Products listProduct={product} onHandleSearch={onSearch}
              PriceUp={onPriceUp} PriceDown={onPriceDown} getValue={ongetValue} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/Login">
            <Login getUser={ongetUser} />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route path="/productdetails/:id">
            <ProductDetail addtoCart={onAddToCart} />
          </Route>
          <Route path="/checkout">
            <Checkout outCart={cart} getQuantity={onGetQuantity} removeCart={onremoveCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>

    </>

  );
}

export default App;
