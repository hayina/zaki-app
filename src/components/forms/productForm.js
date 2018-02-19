import React from 'react';
import Label from './formItems/label'


import '../../css/productForm.css'

export default class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPromotion: true,
            prix: '10'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // handlePromotionCheck() {
    //     this.setState({
    //         isPromotion: !this.state.isPromotion
    //     })
    // }

    handleInputChange(event) {
        
        const { target } = event;

        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value
        });
    }

    render() {

        const showPromotionChek = this.state.isPromotion ? '' : 'hidden'

        return (
            <form action="">
                <div className="form-data-wr">

                    <div className="form-line">
                        <Label label="categorie" />
                        <div className="form-data">
     
                            <div className="radio-grp">
                                <input type="radio" name="categorie" id="cat-0" />
                                <label htmlFor="cat-0" className="radio-label">Boites Multi Usage</label>
                            </div>

                            
                            <div className="radio-grp">
                                <input type="radio" name="categorie" id="cat-1" />
                                <label htmlFor="cat-1"className="radio-label">Bourse Henna Remplie</label>
                            </div>

                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="description" />
                        <div className="form-data">
                            <textarea name="description" rows="10"></textarea>
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="prix" />({this.state.prix})
                        <div className="form-data">
                            <input type="text" name="prix" value={this.state.prix} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="Promotion" />({this.state.isPromotion})
                        <div className="form-data">
                            <input
                                type="checkbox"
                                name="isPromotion"
                                checked={this.state.isPromotion}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={"form-line " + showPromotionChek}>
                        <Label label="Prix Promotion" />
                        <div className="form-data">
                            <input type="text" name="prixPromotion" />
                        </div>
                    </div>

                </div>

                <div className="form-validation">
                    <button type="button" className="btn btn-success">Submit</button>
                </div>

            </form>
        );
    }

}
