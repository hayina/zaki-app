import React from "react"
import { Link } from 'react-router-dom'

import '../css/productList.css'

export default class ProductList extends React.Component {

    componentWillMount() {
        console.log('componentWillMount ...')
        this.initState()
    }

    componentDidMount() {
        console.log('componentDidMount ...')
        this.fetchProducts()
        // this.callApi()
            // .then(res => this.setState({ response: res.express }))
            // .catch(err => console.log(err))
    }

    initState() {
        this.setState({
            products: [],
            isLoading: false
        })
    }

    async fetchProducts() {

        this.setState({
            isLoading: true
        })

        const response = await fetch('/api/products/');
        const products = await response.json();

        console.log('async ...', products)

        this.setState({
            products,
            isLoading: false
        })

    }

    renderEmpty() {

    }

    renderProductList() {

    }

    render() {


         
        return (

            <div className="list-container">

                <h1>ProductList</h1>

                <div className="_list">
                    {
                        this.state.isLoading &&
                        <div className="loading">loading ...</div>
                    }
                    {
                        !this.state.isLoading &&
                        <div className="_size">{this.state.products.length} produits trouvés</div>
                    }
                    {
                        this.state.products.map((product) => (
                            <div className="p_line line" key={product._id}>
                                <div className="p_id _col">{product._id}</div>
                                <div className="p_description _col">{product.description}</div>
                                <div className="p_prix _col">{product.prix}</div>
                                <div className="p_isPromotion _col">{product.isPromotion}</div>
                                <div className="p_prixPromotion _col">{product.prixPromotion}</div>
                                <Link to={"/products/edit/" + product._id}>modifier</Link>
                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }


}
