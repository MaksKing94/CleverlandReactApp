import React from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export const Mycities = ({ myCities, deleteCity }) => {
  let { url } = useRouteMatch();
  return (
    <List>
      {myCities.map((city) => (
        <NavLink to={`${url}/${city.key}`}>
          <ListItem key={city.key} >
            <ListItemText primary={`${city.cityName}`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteCity(city.key)} edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </NavLink>
      ))}
    </List>
  )
}