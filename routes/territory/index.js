import express from "express"
import authValidation from "../../validations/territory.validation.js"
import validate from "../../middlewares/validate.js"

import controllers from "./controllers.js"


const router = express.Router();
router.get("/", controllers.getAll);
router.get("/:id", validate(authValidation.id), controllers.getById);
router.post("/", validate(authValidation.add), controllers.post);
router.patch("/:id", validate(authValidation.update),controllers.update);
router.delete("/:id",validate(authValidation.id),controllers.delete);

export default router;