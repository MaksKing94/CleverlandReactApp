import React from 'react';
import Button from '@material-ui/core/Button';	
import TextField from '@material-ui/core/TextField';	
import AddIcon from '@material-ui/icons/Add';	
import RemoveIcon from '@material-ui/icons/Remove';	
import Fab from '@material-ui/core/Fab';	
import CheckboxList from './CheckboxList';

class ProductList extends React.Component {	
  state = {
   items: [],
   productName: '',
   productValue: 1
  }
};

  onMinusClick = () => {
    if (this.state.currentItem.productValue > 1) {	   
      this.setState((prevState) => ({	     
        ...prevState,	       
        currentItem: {
          ...prevState.currentItem,
          productValue: prevState.currentItem.productValue - 1,
        }	        
      }))	      
    }	    
  };	
 
  onPlusClick = () => {	  
    this.setState((prevState) => ({	    
      ...prevState,	     
      currentItem: {	    
        ...prevState.currentItem,	      
        productValue: prevState.currentItem.productValue + 1,	      
      }	      
    }))	    
  };

  onInputFocus =() => {
    this.setState((prevState) => ({
      ...prevState,
      currentItem: {
        ...prevState.currentItem,
        productName: ''
      }
    }));
  }

  onChangeInput = (event) => {	  
    let text = event.target.value;	  
    this.setState((prevState) => ({	    
      ...prevState,	     
      currentItem: {
        ...prevState.currentItem,	      
        productName: text,	
        key: Date.now()
      }	      
    }));
  };	


  onAddClick = () => {	  
    if (this.state.currentItem.productName && this.state.currentItem.productName !== 'Наименование') {
        this.setState({
            items: [...this.state.items, this.state.currentItem],
            currentItem: {	        
                productName: 'Наименование',
                productValue: 1,	         
                key: '',	         
        }	        
      })
    }	    
  };	
  deleteItem = (key) => {	  
    const filteredItems = this.state.items.filter(item => item.key !== key);	   
    this.setState((prevState) => ({	   
      ...prevState,	     
      items: filteredItems	      
    }));	    
  }	  

  render() {	  
    return (	    
    <div className="ProductList">	     
    <div className="input-wrap">
    <TextField
        onChange={this.onChangeInput}	          
        onFocus={this.onInputFocus}	           
        id="outlined-helperText"	            
        value={this.state.productName}	            
        helperText="Введите наименование продукта и количество"	 
        placeholder="Наименование"         
        variant="outlined"
        />
        <Fab onClick={this.onMinusClick} color="secondary" aria-label="add">
            <RemoveIcon />
        </Fab>	
        <TextField	         
         className="num-input"
          id="outlined-helperText"
        value={this.state.currentItem.productValue}
        variant="outlined"
        />
        
       <Fab onClick={this.onPlusClick} color="secondary" aria-label="add">
        <AddIcon />
        </Fab>
        </div>
        <div className="addButtonContainer">
          <Button onClick={this.onAddClick} variant="contained" color="primary">
            Добавить	           
          </Button>	         
        </div>	        
        <CheckboxList	        
          items={this.state.items}	          
          deleteItem={this.deleteItem}	         
        />	        
      </div>	      
    )	
  };
}
	

export default ProductList;