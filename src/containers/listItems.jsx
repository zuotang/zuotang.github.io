import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LinkIcon from '@material-ui/icons/Link';
import SmsIcon from '@material-ui/icons/Sms';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="首页" />
      </ListItem>
    </Link>
    <Link to="/post/about">
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="关于我" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <SmsIcon />
      </ListItemIcon>
      <ListItemText primary="联系我" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="Tag" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="友情链接" />
    </ListItem>
  </div>
);
