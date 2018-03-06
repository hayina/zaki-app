import React from 'react';


const ValidationError = (props) => (
    props.hasError && props.textError.length > 0 &&
    <div className="error-validation text-danger">{props.textError}</div>
)

export default ValidationError
