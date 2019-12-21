import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { Component } from 'react';
import App from './App'
import Login from './Login'
import List from './List'

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" render = { props => (<App />)} />
                    <Route path = "/login" render = {props => (<Login />)} />
                    <Route path = "/list" render = {props => (<List />)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;