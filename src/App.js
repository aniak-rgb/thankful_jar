import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import { NotFound } from "./components/NotFound"
import { MyCards } from "./components/MyCards/MyCards"
import { DrawCards } from "./components/DrawCards/DrawCards"
import { Main } from "./components/Main/Main"
import { Form } from "./components/Form/Form"

export const App = () => {


  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/form' component={Form} />
        <Route path='/myCarts' component={MyCards} />
        <Route path='/drawCarts' component={DrawCards} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )

}
