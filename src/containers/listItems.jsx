import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LinkIcon from '@material-ui/icons/Link';
import SmsIcon from '@material-ui/icons/Sms';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="首页" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalOfferIcon />
      </ListItemIcon>
      <ListItemText primary="Tag" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary="关于我" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="友情链接" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SmsIcon />
      </ListItemIcon>
      <ListItemText primary="联系我" />
    </ListItem>
  </div>
);
