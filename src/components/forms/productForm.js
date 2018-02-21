import React from 'react';
import Label from './formItems/label'
import ValidationError from './validationError'


import '../../css/productForm.css'

export default class ProductForm extends React.Component {


    constructor(props) {

        super(props);

        const fields = {
            isPromotion: false,
            prix: '',
            prixPromotion: '',
            description: ''
        }

        const errors = {
            prixError: '',
            prixPromotionError: '',
            descriptionError: ''
        }


        this.state = {
            fields,
            errors,
            hasError: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { target } = event;
        this.setState({
            fields: { ...this.state.fields, [target.name]: target.type === 'checkbox' ? target.checked : target.value }
        });
    }

    validateForm() {

        const errors = {
            prixError: '',
            prixPromotionError: '',
            descriptionError: ''
        }

        let hasError = false;

        if (this.state.fields.description.length < 1) {
            errors.descriptionError = "Le champs description est obligatoire"
            hasError = true;
        }

        const { prix } = this.state.fields

        if (prix.length > 0) {
            if (isNaN(parseFloat(prix)) || !isFinite(prix)) {
                errors.prixError = "Le champs prix doit être un nombre"
                hasError = true;
            }
        } else {
            errors.prixError = "Le champs prix est obligatoire"
            hasError = true;
        }

        if (this.state.fields.isPromotion && this.state.fields.prixPromotion.length < 1) {
            errors.prixPromotionError = "Le champs prix promotion est obligatoire"
            hasError = true;
        }

        this.setState({
            errors,
            hasError
        }, () => console.log("Finish Validating ...", this.state));

        return hasError
    }

    submitForm() {
        console.log("Start Validating ...")

        const hasError = this.validateForm();

        if (!hasError) {
            console.log("Submiting ...")
        }
    }

    render() {

    

        return (
            <form action="">
                <div className="form-data-wr">

                    {/* <div className="form-line">
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
                    </div> */}

                    <div className="form-line">
                        <Label label="description" />
                        <div className="form-data">
                            <textarea
                                name="description" rows="10"
                                value={this.state.fields.description} onChange={this.handleInputChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.descriptionError} />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="prix" />
                        <div className="form-data">
                            <input
                                type="text" name="prix"
                                value={this.state.fields.prix} onChange={this.handleInputChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.prixError} />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="Promotion" />
                        <div className="form-data">
                            <input
                                type="checkbox" name="isPromotion"
                                checked={this.state.fields.isPromotion} onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={"form-line" + (this.state.fields.isPromotion ? '' : ' hidden')}>
                        <Label label="Prix Promotion" />
                        <div className="form-data">
                            <input 
                                type="text" name="prixPromotion" 
                                checked={this.state.fields.prixPromotion} onChange={this.handleInputChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.prixPromotionError} />
                        </div>
                    </div>

                </div>

                <div className="form-validation">
                    <button type="button" className="btn btn-success" onClick={() => this.submitForm()}>Submit</button>
                </div>

            </form>
        );
    }

}
