import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasicMenu from './components/NavBar';
import { AboutPage, ContactPage } from './components'

function App() {
  return (
    <Router>
    <NavigationMenu />
    <Switch>
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      {/* Add more routes as needed */}
      <Route path="/" exact> {/* Default or Home page content here */}</Route>
    </Switch>
  </Router>
  );
}

export default App;
