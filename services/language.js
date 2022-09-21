import LanguageModel from "../models/language.js";

const languageService = {
  getAll: async () => {
    try {
      const data = await LanguageModel.find();
      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getById: async id => {
    try {
      const data = await LanguageModel.findById(id);

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async body => {
    try {
      const savedData = await LanguageModel.create(body);

      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async body => {
    try {
      const updateData = await LanguageModel.updateOne(
        { _id: body.id },
        {
          $set: {
            name: body.name,
            code: body.code,
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

  removeById: async id => {
    try {
      const data = await LanguageModel.findByIdAndRemove(id);

      if (data) {
        return { message: "success", data };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default languageService;
