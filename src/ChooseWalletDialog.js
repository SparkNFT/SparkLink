import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
//import DialogTitle from '@mui/material/DialogTitle';
import { Dialog, DialogTitle,List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((wallet) => (
          <ListItem button onClick={() => handleListItemClick(wallet)} key={wallet}>
            <ListItemAvatar>
              {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                
              </Avatar> */}
            </ListItemAvatar>
            <ListItemText primary={wallet} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

export default SimpleDialog;
//此组件用以选择登陆钱包