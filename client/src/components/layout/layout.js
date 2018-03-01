import React from "react"
import { Switch, Route } from 'react-router-dom'

import Home from "../home"
import Header from "./header"
import Footer from "./footer"
import ProductForm from "../forms/productForm"
import ProductList from "../productList"




export default class Layout extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">

                <Header />

                <Switch>
                    <Route exact path="/products" component={ProductList} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product/new" component={ProductForm} />
                </Switch>

                <Footer />

            </div>            
        );
    }

}


