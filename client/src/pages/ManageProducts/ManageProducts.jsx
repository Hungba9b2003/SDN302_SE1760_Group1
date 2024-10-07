import React, { useContext } from 'react'
import './ManageProducts.css'
import { StoreContext } from '../../Context/StoreContext'

const ManageProducts = ({ setCreateProduct, setUpdateProduct }) => {
    const { manageItems, food_list, removeFromManage } = useContext(StoreContext);

    return (
        <div className='manage'>
            <div className='create'>
                <button onClick={() => setCreateProduct(true)}>Create Product</button>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue={"sdaw"}>Order by</option>
                            <option value="fsa">Alphabet</option>
                            <option value="daw">Price</option>
                        </select>
                    </div>
                    <div className='col-md-8 search'>
                        <input type="text" placeholder='Search product' />
                    </div>
                    <div className='col-md-2 search-button'>
                        <button >Search</button>
                    </div>
                </div>
            </div>


            <div className="manage-items">
                <div className="manage-items-title row">
                    <div className='col-md-2'>
                        <p>Items</p>
                    </div>
                    <div className='col-md-3'>
                        <p>Dish</p>
                    </div>
                    <div className='col-md-1'>
                        <p>Price</p>
                    </div>
                    <div className='col-md-4'>
                        <p>Description</p>
                    </div>
                    <div className='col-md-1'>
                        <p>Edit</p>
                    </div>
                    <div className='col-md-1'>
                        <p>Remove</p>
                    </div>

                </div>
                
                <hr />
                    <div className="row manage-items-title manage-items-item ">
                        <div className='col-md-2'>
                            <img src="https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=3aab6b15-7347-48fd-b189-a56870880156&resolution=1000x&keepOriginal=true" alt="" />
                        </div>
                        <div className='col-md-3'>
                            <p>sd</p>
                        </div>
                        <div className='col-md-1'>
                            <p>12$</p>
                        </div>
                        <div className='col-md-4'>
                            <p>Descriptiondddddddddddddddddddddddddbhfdiubiadeshuedawhu</p>
                        </div>
                        <div className='col-md-1'>
                            <p className='manage-items-remove-icon' onClick={() => setUpdateProduct(true)}><i className="fa-solid fa-pen"></i></p>
                        </div>
                        <div className='col-md-1'>
                            <p className='manage-items-remove-icon' onClick={() => removeFromManage(item.food_id)}><i className="fa-solid fa-trash"></i></p>
                        </div>
                        
                    <hr />
                </div>



            </div>
        </div>
    )
}

export default ManageProducts;