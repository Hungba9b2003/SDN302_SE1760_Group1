const Dish = require('../models/Dish');
const Category = require('../models/Category'); // Import model Category
const cloudinary = require('../controller/cloudinary');
const path = require('path');
const fs = require('fs');

// Tạo mới một món ăn
async function createDish(req, res, next) {
    try {
        const { name, price, description, discount, categories } = req.body;

        if (!categories) {
            return res.status(400).json({ message: "Category is required" });
        }

        // Kiểm tra hoặc tạo mới Category
        let categoryId;
        const category = await Category.findOne({ name: categories });
        if (category) {
            categoryId = category._id;
        } else {
            const newCategory = await Category.create({ name: categories, menu_image: '' });
            categoryId = newCategory._id;
        }

        // Xử lý upload ảnh lên Cloudinary (nếu có)
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push({
                    imagineUrl: result.secure_url, // Lấy URL từ Cloudinary
                    imagineName: file.originalname,
                });
            }
        }

        // Tạo Dish mới với thông tin đã nhập
        const newDish = await Dish.create({
            name,
            price,
            description,
            discount,
            categories: categoryId, // Lưu ID của Category
            image: imageUrls,
        });

        res.status(201).json({
            message: "Dish created successfully",
            dish: newDish,
        });
    } catch (error) {
        next(error);
    }
}

// Lấy danh sách món ăn
async function getDishes(req, res, next) {
    try {
        const dishes = await Dish.find().populate('categories', 'name menu_image') //.populate('reviews');
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
}
async function getCategory(req, res, next) {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

async function newCategory(req, res, next) {
    try {
        const { name } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Upload image to Cloudinary if provided
        let menu_image = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            menu_image = result.secure_url;
        }

        // Create new category with Cloudinary image URL
        const newCategory = await Category.create({
            name,
            menu_image
        });

        res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        });
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const { name } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Update name and upload new image if provided
        category.name = name;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            category.menu_image = result.secure_url;
        }

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        next(error);
    }
}

// Xóa một danh mục
async function deleteCategory(req, res, next) {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Nếu danh mục có ảnh, xóa ảnh khỏi thư mục lưu trữ
        if (category.menu_image) {
            const imagePath = path.join(__dirname, '..', 'public', category.menu_image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error(`Error deleting file ${imagePath}:`, err);
            });
        }

        await category.deleteOne(); // Xóa danh mục khỏi cơ sở dữ liệu

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
}

// Lấy một món ăn theo ID
async function getDishById(req, res, next) {
    try {
        const { id } = req.params;
        const dish = await Dish.findById(id).populate('categories', 'name menu_image'); //.populate('reviews');
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (error) {
        next(error);
    }
}

// Cập nhật thông tin món ăn
async function updateDish(req, res, next) {
    try {
        const { name, price, description, discount, categories } = req.body;
        const existingImages = req.body.existingImages || []; // Ảnh cũ từ client

        // Lấy đối tượng dish hiện tại
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        // Cập nhật thông tin từ form
        dish.name = name;
        dish.price = price;
        dish.description = description;
        dish.discount = discount;
        
        // Xử lý category
        if (categories) {
            let categoryId;
            const category = await Category.findOne({ name: categories });
            if (category) {
                categoryId = category._id;
            } else {
                const newCategory = await Category.create({ name: categories });
                categoryId = newCategory._id;
            }
            dish.categories = categoryId;
        }

        // Danh sách các URL ảnh giữ lại và upload ảnh mới lên Cloudinary
        let updatedImages = dish.image.filter(img => existingImages.includes(img.imagineName));
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                updatedImages.push({
                    imagineUrl: result.secure_url,
                    imagineName: file.originalname
                });

                // Xóa file tạm sau khi upload xong
                fs.unlink(file.path, (err) => {
                    if (err) console.error(`Error deleting temporary file ${file.path}:`, err);
                });
            }
        }

        // Cập nhật trường ảnh trong document dish
        dish.image = updatedImages;

        // Lưu cập nhật vào database
        await dish.save();

        res.status(200).json({ message: "Dish updated successfully", dish });
    } catch (error) {
        next(error);
    }
}

// Xóa một món ăn
async function deleteDish(req, res, next) {
    try {
        const { id } = req.params;
        const dish = await Dish.findByIdAndDelete(id);

        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish,
    getCategory,
    newCategory,
    updateCategory,
    deleteCategory
};