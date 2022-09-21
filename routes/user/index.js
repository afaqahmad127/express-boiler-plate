import express from "express"
import authValidation from "../../validations/user.validation.js"
import validate from "../../middlewares/validate.js"
import controllers from "./controllers.js"
import authenticate from "../../middlewares/authenticate.js"

const router = express.Router();
router.get("/", /*authenticate,*/ controllers.getAll);
router.get("/profile", authenticate, controllers.getById);
router.post("/login", validate(authValidation.login), controllers.login);
router.post("/register", validate(authValidation.register), controllers.register);
router.patch("/:id?", authenticate, validate(authValidation.update), controllers.update);
router.delete("/:id?", authenticate, validate(authValidation.id), controllers.delete);

export default router;
