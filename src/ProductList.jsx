import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckboxList from './CheckboxList';
import Counter from './Counter';

function ProductList() {
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [productValue, setProductValue] = useState(1);
  
  const onMinusClick = () => {
    if (productValue > 1) setProductValue(productValue - 1)
  };

  const onPlusClick = () => setProductValue(productValue + 1);
  
  const onChangeInput = (event) => setProductName(event.target.value);
  
  const onAddClick = () => {
    if (productName) {
      let item = {
        productName,
        productValue,
        key: Date.now(),
      };
      setItems([...items, item]);
      setProductName('');
      setProductValue(1);
    };
  };
  
  const deleteItem = (key) => {
    const filteredItems = items.filter(item => item.key !== key);
    setItems(filteredItems);
  };

  return (
    <div className="ProductList">
      <div className="input-wrap">
        <TextField
          onChange={onChangeInput}
          placeholder="Наименование"
          id="outlined-helperText"
          value={productName}
          helperText="Введите наименование продукта и количество"
          variant="outlined"
        />
        <Counter
          onMinusClick={onMinusClick}
          onPlusClick={onPlusClick}
          productValue={productValue}
        />
      </div>
      <div className="addButtonContainer">
        <Button onClick={onAddClick} variant="contained" color="primary">
          Добавить
          </Button>
      </div>
      <CheckboxList
        items={items}
        deleteItem={deleteItem}
      />
    </div>
  )
}

export default ProductList;