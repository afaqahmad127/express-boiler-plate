import ProductModel from "../models/product.js";

const productService = {
  getAll: async (userId) => {
    try {
      const query = { user_id: userId, is_active: true };
      const data = await ProductModel.find(query)
        .populate("user_id", "email first_name last_name role image");

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const query = { _id: id, is_active: true };
      const data = await ProductModel
        .find(query)
        .populate("user_id", "email first_name last_name role image");
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getBySearchName: async (body) => {
    try {
      const query = { _id: body.id, is_active: true };
      const data = await ProductModel.aggregate([
        {
          $match: {
            $and: [
              { name: { $regex: ".*" + body.id + ".*", $options: "i" } },
              { is_active: true },
            ],
          },
        },
      ]);

      // .find({ name: { $regex: ".*" + body.id + ".*", $options: "i" } })
      // .populate("user_id", "email first_name last_name role image");
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getByUserId: async (body) => {
    try {
      const query = { user_id: body, is_active: true };
      const data = await ProductModel
        .find(query)
        .populate("user_id", "email first_name last_name role image");
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      throw error;
    }
  },
  getUserByProductID: async (body) => {
    try {
      const data = await ProductModel
        .findById(body)
        .populate("user_id", "email first_name last_name");
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  add: async (body) => {
    try {
      const savedData = await ProductModel.create(body);

      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  update: async (body) => {
    try {
      const id = body.id;
      const updateData = await ProductModel.updateOne(
        { _id: id },
        { $set: body },
        { runValidators: true }
      );

      if (updateData) {
        return { message: "success", data: updateData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  removeById: async (id) => {
    try {
      const data = await ProductModel.updateOne(
        { _id: id },
        { $set: { is_active: false } },
        { runValidators: true }
      );

      if (data) {
        return { message: "success", data: "Deleted" };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default productService;
