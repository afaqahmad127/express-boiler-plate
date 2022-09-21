import TerritoryModel from "../models/territory.js";



const territoryService = {
  getAll: async () => {
    try {
      const data = await TerritoryModel.find();
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getById: async (id) => {
    try {
      const data = await TerritoryModel.findById(id);
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const savedData = await TerritoryModel.create(body);

      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (body) => {
    try {
      const updateData = await TerritoryModel.updateOne(
        { _id: body.id },
        {
          $set: {
            name: body.name,
          },
        },
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
      const data = await TerritoryModel.findByIdAndRemove(id);

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default territoryService;
