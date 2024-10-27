const Detail = require("../models/Dish");
const getById = async (req, res, next) => {
  try {
    const detail = await Detail.findById(req.params.id).populate(
      "categories reviews"
    );
    if (!detail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = {
  getById,
};
