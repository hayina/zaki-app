import React from 'react';
import axios from 'axios'

import Label from './formItems/label'
import ValidationError from './validationError'


import '../../css/productForm.css'

export default class ProductForm extends React.Component {


    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentWillMount() {
        this.initFormState()
    }

    componentDidMount() {

        const _idProduct = this.props.match.params.id

        if (_idProduct !== undefined) {

            this.getProductToEditApi(_idProduct)

                .then(product => {
                    this.setState(
                        { fields: { ...product, images: [] } },
                        () => console.log('Product To Edit from State : ', this.state.fields)
                    )
                })
                .catch(err => console.log(err))
        }
        else {
            // 
        }

    }


    async getProductToEditApi(_idProduct) {

        const response = await axios.get('/api/products/' + _idProduct);
        const _product = response.data;

        console.log('Product To Edit from API : ', _product)

        return _product

    }
    initFormState() {
        
        const fields = {
            _id: null,
            isPromotion: false,
            prix: '',
            prixPromotion: '',
            description: '',
            images: [],          
        }

        const errors = {
            prix: '',
            prixPromotion: '',
            description: '',
            images: ''
        }

        this.setState({
            fields,
            errors,
            hasError: false
        });

    }

    handleInputChange(event) {
        const { target } = event;
        this.setState({
            fields: { ...this.state.fields, [target.name]: target.type === 'checkbox' ? target.checked : target.value }
        });
    }

    validateForm(rules) {

        const { errors, fields } = this.state
        let hasError = false;

        Object.entries(rules).forEach(([fieldName, arrayRules]) => {

            errors[fieldName] = ''


            console.log(fieldName + ' >> ' + arrayRules)

            arrayRules.some((rule) => {

                const fieldVal = fields[fieldName]

                switch (rule) {
                    case 'required':
                        console.log('required')
                        if (fieldVal.length < 1) {
                            errors[fieldName] = 'Ce Champs est obligatoire'
                            hasError = true;
                            return true
                        }
                        return false
                    case 'number':
                        console.log('number')
                        if (isNaN(parseFloat(fieldVal)) || !isFinite(fieldVal)) {
                            errors[fieldName] = "Ce champs doit être un nombre"
                            hasError = true
                            return true
                        }
                        return false
                    default:
                        return false
                }
            })
        })
   

        this.setState({
            errors,
            hasError
        }, () => console.log("Finish Validating ...", this.state));

        return hasError
    }

    submitForm() {
      

        // Setting validation rules
        const rules = {
            prix: ['required', 'number'],
            description: ['required'],
            // images: ['required']
        }

        if (this.state.fields.isPromotion) {
            rules.prixPromotion = ['required', 'number']
        }

        // Form validation
        const hasError = this.validateForm(rules);

        if (!hasError) {
            this.postProductApi()
        }
    }



    async postProductApi() {

        try {
            const response = await axios.post('/api/products/', this.state.fields)
            console.log(response);
            this.initFormState()
        } catch (error) {
            console.error(error);
            console.log(error.response.data.message)
        }

    }

    handleImageChange(e) {
        
        console.log("FILE INPUT HAS CHANGED >> " + e.target.value)
        const { files } = e.target
        // const { images } = this.state.fields
        console.log(files)
        const filesAmount = files.length

        for (let i = 0; i < filesAmount; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    fields: { ...this.state.fields, images: [...this.state.fields.images, reader.result] }
                }, () => {
                    if (this.state.fields.images.length === filesAmount) {
                        // console.log("m7i init input")
                        this.imgInput.value = ''
                    }
                });

            }
            reader.readAsDataURL(files[i])
        }
    }

    deleteImage(index) {
        const toDelete = this.state.fields.images[index]
        this.setState({
            fields: { ...this.state.fields, images: this.state.fields.images.filter((img, i) => i !== index) }
        })
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
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.description} />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="prix" />
                        <div className="form-data">
                            <input
                                type="text" name="prix"
                                value={this.state.fields.prix} onChange={this.handleInputChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.prix} />
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
                                value={this.state.fields.prixPromotion} onChange={this.handleInputChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.prixPromotion} />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="Photos" />
                        <div className="form-data">
                            <input
                                type="file" multiple="true" 
                                ref={inp => { this.imgInput = inp }}
                                onChange={this.handleImageChange}
                            />
                            <ValidationError hasError={this.state.hasError} textError={this.state.errors.images} />
                            <div className="imagePreview">
                            {
                                this.state.fields.images.map((img, i) => (
                                    <div className="img-item" key={i}>
                                        <div className="img-header">
                                            <h4>Photo n° {(i + 1)}</h4>
                                            <button 
                                                type="button" className="supp-img btn btn-danger"
                                                onClick={() => this.deleteImage(i)}
                                            >
                                            supprimer
                                            </button>
                                        </div>

                                        <img src={img} />
                                    </div>
                                ))
                            }
                            </div>
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
