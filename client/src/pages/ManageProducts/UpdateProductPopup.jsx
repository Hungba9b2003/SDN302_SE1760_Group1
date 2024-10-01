import React, { useState } from 'react'
import './UpdateProductPopup.css'
import { assets } from '../../assets/assets'
import PropTypes from 'prop-types';
const UpdateProductPopup = ({ setUpdateProduct }) => {

    const [currState, setCurrState] = useState("update");

    return (
        <div className='update-popup'>
            <div className="update-popup-container">
                <div className="update-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setUpdateProduct(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="update-popup-inputs">
                    <input type="text" placeholder='Product name' />
                    <input type="text" placeholder='Price' />
                    <input type="number" placeholder='quantity' />
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select </option>
                        <option value="awd">One</option>
                        <option value="ada">Two</option>
                        <option value="ada">Three</option>
                    </select>
                    <div className="radio-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  value="option1"/>
                            <label className="form-check-label"> 1</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  value="option2"/> 
                            <label className="form-check-label" > 2</label>
                    </div>
                    </div>
                    

                </div>
                <button>Update</button>
            </div>
        </div>
    )

};
UpdateProductPopup.propTypes = {
    setUpdateProduct: PropTypes.func.isRequired,
};


export default UpdateProductPopup
