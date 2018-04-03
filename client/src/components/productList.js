import React from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../scss/productList.scss'

export default class ProductList extends React.Component {

    componentWillMount() {
        this.initState()
    }

    componentDidMount() {
        this.fetchProducts()
        // this.callApi()
            // .then(res => this.setState({ response: res.express }))
            // .catch(err => console.log(err))
    }

    initState() {
        this.setState({
            products: [],
            isLoading: false,
            deleteIsLoading: false,
        })
    }

    async fetchProducts() {

        this.setState({ isLoading: true })

        try {
            const response = await axios.get('/api/products/');
            const products = response.data;
            console.log('async fetch products from API : ', products)
            this.setState({
                products,
                isLoading: false
            })
        } catch (error) {
            console.error(error);
            console.log(error.response.data.message)
        }

    }

    async deleteProduct(_id) {

        this.setState({ deleteIsLoading: true })

        try {
            const response = await axios.delete('/api/products/' + _id);
            this.setState({
                products: this.state.products.filter(_product => _product._id !== _id),
                deleteIsLoading: false,
            })
        } catch (error) {
            console.error(error);
            console.log(error.response.data.message)
        }
    }

    renderEmpty() {

    }

    renderProductList() {

    }

    render() {


         
        return (

            <div className="list-container" id="product-list-comp">

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
                        this.state.products.map((product, index) => (
                            <div className={(this.state.deleteIsLoading ? "deleteIsLoading " : "") + "p_line line"} key={product._id}>
                                <div className="p_id _col">{product._id}</div>
                                <div className="p_description _col">{product.description}</div>
                                <div className="p_prix _col">{product.prix}</div>
                                <div className="p_isPromotion _col">{product.isPromotion}</div>
                                <div className="p_prixPromotion _col">{product.prixPromotion}</div>
                                <Link to={"/products/edit/" + product._id}>modifier</Link>
                                <a href="javascript()" onClick={() => this.deleteProduct(product._id)}>supprimer</a>

                                <div className="gallery">
                                    {
                                        product.images.map((img, index) => (
                                            <div className="img-item" key={img.name}>
                                                <img src={'/gallery/' + img.name} />
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }


}
