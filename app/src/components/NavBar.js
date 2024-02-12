// NavBar.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

function NavBar({ onAboutClick, onContactClick, onDatabaseClick, onEmailClick }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLinkClick = (text) => {
    if (text === 'About') {
      onAboutClick();
      toggleDrawer(false);
    }
    if (text === 'Contact') {
      onContactClick();
      toggleDrawer(false);
    }
    if (text === 'Database') {
      onDatabaseClick();
      toggleDrawer(false);
    }
    if (text === 'Email Finder') {
      onEmailClick();
      toggleDrawer(false);
    }
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'About', 'Contact', 'Database', 'Email Finder'].map((text, index) => (
          <ListItem button key={text} className="list-item" onClick={() => handleLinkClick(text)}>
            <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar className="toolbar">
          <div />
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} className="menu-button">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} className="drawer">
        {list()}
      </Drawer>
    </div>
  );
}

export default NavBar;
