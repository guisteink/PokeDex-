import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../views/Home'
import Detail from '../views/Detail'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" name="Index" component={Home}></Route>
                <Route path="/pokemon/:id" exact component={Detail} />
            </Switch>
        </BrowserRouter>
    );
}