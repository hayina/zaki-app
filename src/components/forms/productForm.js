import React from 'react';
import Label from './formItems/label'
import Radio from './formItems/radio'

import '../../css/productForm.css'

export default class ProductForm extends React.Component {


    render() {
        return (
            <form action="">
                <div className="form-data-wr">
                    <div className="form-line">
                        <Label label="categorie" />
                        <div className="form-data">
                            <Radio name="categorie" label="Boites Multi Usage" />
                            <Radio name="categorie" label="Bourse Henna Remplie" />
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="description" />
                        <div className="form-data">
                            <textarea name="description" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                    <div className="form-line">
                        <Label label="prix" />
                        <div className="form-data">
                            <input type="text" name="prix" />
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
