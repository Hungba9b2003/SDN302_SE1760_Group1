import React, { useState } from 'react'
import '../../module/UpdateProductPopup.css'
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
                    <div  >Image</div>
                    <input type="text" placeholder='Image url' />
                    <div>Name</div>
                    <input type="text" placeholder='Product name' />
                    <div>Price</div>
                    <input type="text" placeholder='Price' />
                    <div>Description</div>
                    <input type="text" placeholder='description' />
                    <div>Category</div>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue={"sdaw"}>noddle</option>
                        <option value="fsa">dessert </option>
                        <option value="daw">snack</option>
                        <option value="ewad">drink</option>
                    </select>
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
