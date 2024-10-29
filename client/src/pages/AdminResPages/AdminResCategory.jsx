import React, { useState, useEffect } from 'react';
import '../../module/adminRes.css';
import '../../module/ManageProducts.css';
import '../../module/ManageCategory.css';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog'; // Dialog xác nhận
import AdminResNavbar from './../../components/AdminComponents/AdminResNavbar';
import AdminResSidebar from './../../components/AdminComponents/AdminResSidebar';

const AdminResCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [deleteCategoryName, setDeleteCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Điều khiển dialog xác nhận

    // Fetch danh sách category từ backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/manage/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Xử lý thêm category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newCategoryName);
        if (newCategoryImage) formData.append('menu_image', newCategoryImage);

        try {
            const response = await axios.post('http://localhost:5000/manage/category', formData);
            setCategories((prev) => [...prev, response.data]);
            setNewCategoryName('');
            setNewCategoryImage(null);
            alert('Category added successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Mở form update category
    const handleEditClick = (category) => setEditingCategory(category);

    // Cập nhật category
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editingCategory.name);
        if (newCategoryImage) formData.append('menu_image', newCategoryImage);

        try {
            await axios.put(`http://localhost:5000/manage/category/${editingCategory._id}`, formData);
            setCategories((prev) =>
                prev.map((cat) =>
                    cat._id === editingCategory._id ? { ...cat, name: editingCategory.name } : cat
                )
            );
            setEditingCategory(null);
            setNewCategoryImage(null);
            alert('Category updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    // Xác nhận xóa category
    const openDeleteDialog = (id, name) => {
        setDeleteCategoryId(id);
        setDeleteCategoryName(name);
        setIsDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/manage/category/${deleteCategoryId}`);
            setCategories((prev) => prev.filter((cat) => cat._id !== deleteCategoryId));
            alert(`Category "${deleteCategoryName}" deleted successfully.`);
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setIsDialogOpen(false);
            setDeleteCategoryId(null);
            setDeleteCategoryName('');
        }
    };

    return (
        <div className="adminres-container">
            <AdminResNavbar />
            <div className="adminres-content">
                <div className="adminres-main">
                    <h1>Categories Management</h1>

                    {/* Form thêm category */}
                    <form onSubmit={handleAddCategory} className="form-container">
                        <h2>Add Category</h2>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                onChange={(e) => setNewCategoryImage(e.target.files[0])}
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Add Category</button>
                        </div>
                    </form>

                    {/* Danh sách category */}
                    <div className="manage-items card-container">
                        {categories.map((category) => (
                            <div className="card" key={category._id}>
                                <div className="card-image">
                                    {category.menu_image ? (
                                        <img
                                            src={`http://localhost:5000${category.menu_image}`}
                                            alt={category.name}
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>
                                <div className="card-content">
                                    <h2>{category.name}</h2>
                                    <div className="card-actions">
                                        <button onClick={() => handleEditClick(category)}>Update</button>
                                        <button onClick={() => openDeleteDialog(category._id, category.name)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form cập nhật category */}
                    {editingCategory && (
                        <form onSubmit={handleUpdateCategory} className="form-container">
                            <h2>Update Category</h2>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={editingCategory.name}
                                    onChange={(e) =>
                                        setEditingCategory({ ...editingCategory, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload New Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setNewCategoryImage(e.target.files[0])}
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Save Changes</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Dialog xác nhận xóa */}
                    {isDialogOpen && (
                        <ConfirmDialog
                            message={`Are you sure you want to delete category "${deleteCategoryName}"?`}
                            onConfirm={confirmDelete}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminResCategory;