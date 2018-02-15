import React from 'react';


const Radio = (props) => (


    <div className="radio-grp">
        <input type="radio" name="{props.name}" />
        <label className="radio-label">{props.label}</label>
    </div>

)

export default Radio



