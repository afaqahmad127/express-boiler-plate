import UserService from "../../services/user.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
  getAll: async (req, res) => {
    try {
      const data = await UserService.getAll();
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const data = await UserService.getById(req.user._id);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  register: async (req, res) => {
    const addResponse = await UserService.add(req.body);
    if (addResponse.message === "success") {
      return httpResponse.CREATED(res, addResponse.data);
    } else if (addResponse.message === "failed") {
      return httpResponse.CONFLICT(res, addResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, addResponse.data);
    }
  },

  login: async (req, res) => {
    const data = await UserService.login(req.body);
    if (data.message === "success") {
      return httpResponse.SUCCESS(res, data.data, data.data);
    } else {
      return httpResponse.NOT_FOUND(res, data.data, data.data);
    }
  },

  update: async (req, res) => {
    req.body.id = req.params.id;

    const updateResponse = await UserService.update(req.body);
    if (updateResponse.message === "success") {
      return httpResponse.SUCCESS(res, updateResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, updateResponse.data);
    }
  },

  delete: async (req, res) => {
    const deleteResponse = await UserService.removeById(req.params.id);
    if (deleteResponse.message === "success") {
      return httpResponse.SUCCESS(res, deleteResponse.data);
    } else if (deleteResponse.message === "error") {
      return httpResponse.NOT_FOUND(res, deleteResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, deleteResponse.data);
    }
  }
}

export default controller;
