import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import BookIcon from '@material-ui/icons/Book';
import LinkIcon from '@material-ui/icons/Link';
import SmsIcon from '@material-ui/icons/Sms';
import {Link} from 'react-router-dom';

const MainListItems = ({onClose}) => (
  <React.Fragment>
    <Link to="/">
      <ListItem button onClick={onClose}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="首页" />
      </ListItem>
    </Link>
    <Link to="/list">
      <ListItem button onClick={onClose}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="文章" />
      </ListItem>
    </Link>
    <Link to="/post/about">
      <ListItem button onClick={onClose}>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="关于我" />
      </ListItem>
    </Link>
    <Link to="/water">
      <ListItem button onClick={onClose}>
        <ListItemIcon>
          <SmsIcon />
        </ListItemIcon>
        <ListItemText primary="水" />
      </ListItem>
    </Link>
    {/* <ListItem button onClick={onClose}>
      <ListItemIcon>
        <SmsIcon />
      </ListItemIcon>
      <ListItemText primary="联系我" />
    </ListItem>

    <ListItem button onClick={onClose}>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="友情链接" />
    </ListItem> */}
  </React.Fragment>
);

export default MainListItems;
