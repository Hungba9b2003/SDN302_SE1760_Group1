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
                        <option value="fsa">One</option>
                        <option value="daw">Two</option>
                        <option value="ewad">Three</option>
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
                <div className="manage-items-title">
                    <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Edit</p> <p>Remove</p>
                </div>
                <br />
                <hr />


                <div>
                    <div className="manage-items-title manage-items-item">
                        <img src="" alt="" />
                        <p>sd</p>
                        <p>daw</p>
                        <div>1</div>
                        <p className='manage-items-remove-icon' onClick={() => setUpdateProduct(true)}><i className="fa-solid fa-pen"></i></p>
                        <p className='manage-items-remove-icon' onClick={() => removeFromManage(item.food_id)}><i className="fa-solid fa-trash"></i></p>
                    </div>
                    <hr />
                </div>



            </div>
        </div>
    )
}

export default ManageProducts;