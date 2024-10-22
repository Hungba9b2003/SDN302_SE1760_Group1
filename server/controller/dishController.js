const Dish = require('../models/Dish');
const path = require('path');
const fs = require('fs');

// Tạo mới một món ăn
async function createDish(req, res, next) {
    try {
        const { name, price, description, discount, categories } = req.body;

        // Kiểm tra xem categories có được cung cấp hay không
        if (!categories) {
            return res.status(400).json({ message: "Category is required" });
        }

        // Xử lý file ảnh (nếu có)
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map((file) => ({
                imagineUrl: `/uploads/${file.filename}`, // Lưu đường dẫn ảnh
                imagineName: file.originalname
            }));
        }

        // Tạo Dish mới với thông tin đã nhập
        const newDish = await Dish.create({
            name,
            price,
            description,
            discount,
            categories,
            image: imageUrls, // Lưu danh sách ảnh
        });

        res.status(201).json({
            message: "Dish created successfully",
            dish: newDish,
        });
    } catch (error) {
        next(error); // Xử lý lỗi thông qua middleware lỗi
    }
}

// Lấy danh sách món ăn
async function getDishes(req, res, next) {
    try {
        const dishes = await Dish.find()//.populate('reviews');
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
}

// Lấy một món ăn theo ID
async function getDishById(req, res, next) {
    try {
        const { id } = req.params;
        const dish = await Dish.findById(id)//.populate('reviews');
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
        const { id } = req.params;
        const { name, price, description, discount, categories } = req.body;

        // Kiểm tra xem categories có được cung cấp hay không
        if (!categories) {
            return res.status(400).json({ message: "Category is required" });
        }

        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        // Xử lý cập nhật hình ảnh (nếu có)
        let imageUrls = dish.image; // Giữ lại ảnh cũ
        if (req.file) {
            imageUrls = [{
                imagineUrl: `/uploads/${req.file.filename}`,
                imagineName: req.file.originalname
            }];
        }

        // Cập nhật thông tin món ăn
        dish.name = name;
        dish.price = price;
        dish.description = description;
        dish.discount = discount;
        dish.categories = categories;
        dish.image = imageUrls;

        await dish.save();

        res.status(200).json({
            message: "Dish updated successfully",
            dish,
        });
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
};
