import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from "./component/Header/Header";
import FormCat from "./component/FormCat/FormCat";
import Archive from "./component/Archive/Archive";

import './App.scss';


function App() {
  const menu = [
    {
      link: '/',
      text: 'FormCat'
    },
    {
      link: '/catstagram',
      text: 'Catstagram'
    }
  ]
  return (

    <Router>
      <Header menu={menu}/>

      <Switch>
        <Route path="/catstagram">
          <Archive/>
        </Route>
        <Route path="/">
          <FormCat/>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
