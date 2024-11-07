const Dish = require('../models/Dish');
const jwt = require("jsonwebtoken");
const Category = require('../models/Category'); // Import model Category
const cloudinary = require('../controller/cloudinary');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
// Tạo mới một món ăn
async function createDish(req, res, next) {
    try {
      const { name, price, description, discount, categories } = req.body;
  
      if (!categories) {
        return res.status(400).json({ message: "Category is required" });
      }
  
      // Verify the token and get the restaurant ID
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const restaurantId = decoded.restaurantId;
  
      // Find or create the category
      let categoryId;
      const category = await Category.findOne({ name: categories });
      if (category) {
        categoryId = category._id;
      } else {
        const newCategory = await Category.create({ name: categories });
        categoryId = newCategory._id;
      }
  
      // Handle image upload to Cloudinary (if any)
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          imageUrls.push(result.secure_url);
        }
      }
  
      // Create the new Dish
      const newDish = await Dish.create({
        name,
        price,
        description,
        discount,
        categories: categoryId,
        image: imageUrls,
      });
  
      // Update the Restaurant's menu to include the new dishId
      await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $push: { menu: { dishId: new mongoose.Types.ObjectId(newDish._id), status: "available" } } },
        { new: true }
      );
  
      res.status(201).json({
        message: "Dish created successfully and added to restaurant's menu",
        dish: newDish,
      });
    } catch (error) {
      next(error);
    }
  }

async function updateRestaurantMenu(req, res, next) {
    try {
      const { dishId } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const restaurantId = decoded.restaurantId;
  
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Add the dish to the menu
      restaurant.menu.push({ dishId, status: 'available' });
      await restaurant.save();
  
      res.status(200).json({ message: 'Dish added to the menu' });
    } catch (error) {
      next(error);
    }
  }
  

// Lấy danh sách món ăn
async function getDishes(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'Restaurant') {
            return res.status(403).json({ message: "Access denied" });
        }

        const dishes = await Dish.find({ restaurant: decoded.id }).populate('categories', 'name menu_image');
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
}

async function getDishesByRestaurantId(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurantId = decoded.restaurantId;

        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menu.dishId', // Đảm bảo rằng đây là đúng tên trường trong model
            model: 'Dish' // Tên model của món ăn
        });
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        const availableDishes = restaurant.menu
            .filter(dish => dish.status === "available")
            .map(dish => dish.dishId); // Trả về chi tiết món ăn

        res.status(200).json(availableDishes);
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
        const existingImages = req.body.existingImages || []; // Lưu lại ảnh cũ từ client

        // Lấy dish hiện tại
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

        // Danh sách URL ảnh giữ lại và upload ảnh mới lên Cloudinary
        let updatedImages = dish.image.filter(img => existingImages.includes(img));

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                updatedImages.push(result.secure_url);
                
                // Xóa file tạm sau khi upload xong
                fs.unlink(file.path, (err) => {
                    if (err) console.error(`Error deleting temporary file ${file.path}:`, err);
                });
            }
        }

        // Cập nhật trường ảnh của dish
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

        console.log(`Request to delete dish with ID: ${id}`); // Log ID món ăn

        // Tìm món ăn theo ID và xóa
        const dish = await Dish.findByIdAndDelete(id);
        if (!dish) {
            console.error(`Dish not found with ID: ${id}`); // Log lỗi nếu không tìm thấy món ăn
            return res.status(404).json({ message: "Dish not found" });
        }

        // Xóa ID món ăn khỏi menu của nhà hàng
        const updateResult = await Restaurant.updateMany(
            { 'menu.dishId': id }, // Tìm các nhà hàng có món ăn trong menu
            { $pull: { menu: { dishId: id } } } // Xóa món ăn khỏi menu
        );

        console.log(`Updated restaurant menu for dish ID: ${id}, result: ${updateResult}`); // Log kết quả cập nhật

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        console.error('Error while deleting dish:', error); // Log lỗi nếu có
        next(error);
    }
}

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    getCategory,
    newCategory,
    updateCategory,
    deleteCategory,
    getDishesByRestaurantId,
    updateRestaurantMenu,
    deleteDish
};