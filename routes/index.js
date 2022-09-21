import express from "express";

// routes
import productRoute from "./product/index.js";
import languageRoute from "./language/index.js";
import territoryRoute from "./territory/index.js";
import userRoute from "./user/index.js";

const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/product", productRoute);
protectedRouter.use("/language", languageRoute);
protectedRouter.use("/territory", territoryRoute);

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);

export { protectedRouter, unProtectedRouter };
