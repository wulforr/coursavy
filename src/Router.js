import { Route, Switch, HashRouter } from "react-router-dom";
import React, { Component } from 'react';
// import App from './App'
import Login from './Login'
import List from './List'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    {/* <Route exact path = "/" render = { props => (<App />)} /> */}
                    <Route exact path = "/" render = {props => (<Login />)} />
                    <Route path = "/list" render = {props => (<List />)} />
                </Switch>
            </HashRouter>
        );
    }
}

export default Router;