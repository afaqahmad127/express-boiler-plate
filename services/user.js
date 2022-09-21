import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";

const UserService = {
  getAll: async () => {
    try {
      // I am using aggregate because I want to get all the users and their products' length. 
      const data = await UserModel.aggregate([
        { $match: { is_active: true } },
        { $project: { password: 0 } },
        {
          $lookup: {
            from: "products",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$user_id", "$$userId"] },
                      { $eq: ["$is_active", true] },
                    ],
                  },
                },
              },
            ],
            as: "products",
          },
        },
      ]);

      if (data) {
        const countData = data.map((user) => {
          return {
            ...user,
            products: user.products.length,
          };
        });
        return { message: "success", data: countData };
      } else {
        // TODO document why this block is empty
      
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getById: async (id) => {
    try {
      const data = await UserModel.findById(id).select({ password: 0 });

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getByEmail: async (email) => {
    try {
      const data = await UserModel.find({ email: email });

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  login: async ({ email, password }) => {
    try {
      const data = await UserModel.findOne({ email });

      if (!data) {
        return { message: "error", data: "Email is wrong" };
      }

      const isVerified = passwordHash.verify(
        password,
        data.password
      );

      if (!isVerified) {
        return { message: "error", data: "Password is wrong" };
      }

      delete data._doc.password;
      const token = await jwt.sign(data._doc, "my_temporary_secret");
      if (token) {
        return { message: "success", data: { token } };
      } else {
        return { message: "error", data: "Token is not generated" };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const data = await UserModel.findOne({ email: body.email });
      if (data) {
        return { message: "failed", data: "User already exist" };
      }

      const hashedPassword = passwordHash.generate(body.password);
      body.password = hashedPassword;
      body.role = 'vendor';

      const savedData = await UserModel.create(body);
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
      delete body.id;
      const data = await UserModel.updateOne(
        { _id: id },
        { $set: body },
        { runValidators: true }
      );
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  removeById: async (id) => {
    const data = await UserModel.findOne({ _id: id });

    if (data) {
      data.is_active = false;
      const deactivateUser = await data.save();
      if (deactivateUser) {
        await ProductModel.updateMany({ user_id: id }, { is_active: false });

        return { message: "success", data };
      }
    } else {
      return { message: "error", data: "User not found" };
    }
  },

  userProfile: async (req) => {
    console.log(req);
    try {
      const data = await UserModel.findOne({ _id: req.user.user._id });
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
