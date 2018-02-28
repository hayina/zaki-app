import React from "react";
import Header from "./header"
import Footer from "./footer"
import ProductForm from "../forms/productForm"




export default class Layout extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <Header />
                <ProductForm />
                <Footer />
            </div>            
        );
    }

}


