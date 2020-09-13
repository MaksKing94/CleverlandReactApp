import React from 'react';
import ProductList from './components/productList/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">	
     <h1 className="main-title">CleverlandReactApp Список покупок</h1>
     <div>
     <ProductList className="ProductList" />	     
      </div>
    </div>	  
  );
}

export default App;
