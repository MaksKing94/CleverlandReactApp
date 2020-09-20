import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      
      {props.items.map((item) => {
        return (
          <ListItem key={item.key} >
            <ListItemIcon>
              <Checkbox
                edge="start"
              />
            </ListItemIcon>
            <ListItemText primary={`${item.productName} | ${item.productValue}`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => props.deleteItem(item.key)} edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}