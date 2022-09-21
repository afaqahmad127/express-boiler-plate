import TerritoryService from "../../services/territory.js"
import httpResponse from "../../utils/httpResponse.js";


 const controller = {
  getAll: async (req, res) => {
    const data = await TerritoryService.getAll()

    if (data.message === "success") {
      return httpResponse.SUCCESS(res, data.data)
    } else {
      return httpResponse.INTERNAL_SERVER_ERROR(res, data.data)
    }
  },
  
  getById: async (req, res) => {
    const data = await TerritoryService.getById(req.params.id)

    if (data.message === "success") {
      return httpResponse.SUCCESS(res, data.data)
    } else {
      return httpResponse.INTERNAL_SERVER_ERROR(res, data.data)
    }
  },

  post: async (req, res) => {
    const data = await TerritoryService.add(req.body)

    if (data.message === "success") {
      return httpResponse.CREATED(res, data.data)
    } else {
      return httpResponse.INTERNAL_SERVER_ERROR(res, data.data)
    }
  },

  update: async (req, res) => {
    req.body.id = req.params.id

    const data = await TerritoryService.update(req.body)

    if (data.message === "success") {
      return httpResponse.SUCCESS(res, data.data)
    } else {
      return httpResponse.INTERNAL_SERVER_ERROR(res, data.data)
    }
  },

  delete: async (req, res) => {
    const data = await TerritoryService.removeById(req.params.id)

    if (data.message === "success") {
      return httpResponse.SUCCESS(res, data.data)
    }
    else {
      return httpResponse.INTERNAL_SERVER_ERROR(res, data.data)
    }
  }
}

export default controller
