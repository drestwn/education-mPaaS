const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const { loggedAuth } = require("../middlewares/routerMiddleware");
const dataErrors = require("../middlewares/errorHandler");

router.post("/login/admin", Controller.LoginAdmin);
router.post("/register/admin", Controller.RegisterAdmin);
router.get("/refreshaccesstoken", Controller.refreshAccessToken);

router.get("/product", Controller.renderProduct);
router.get("/category", Controller.renderCategory);
router.get("/user", Controller.renderAdmin);

router.get("/client/Product/:id", Controller.renderProductClient);

router.post("/createproduct", loggedAuth, Controller.createProduct);
router.post("/createCategory", loggedAuth, Controller.createCategory);

router.delete("/product/:id", loggedAuth, Controller.deleteProductById);
router.delete("/Category/:id", loggedAuth, Controller.deleteCategoryById);

router.patch("/Product/:id", loggedAuth, Controller.updateProductById);
router.patch("/Category/:id", loggedAuth, Controller.updateCategoryById);

router.get("/ProductDetail/:id", loggedAuth, Controller.RenderDetailProduct);
router.get("/CategoryDetail/:id", loggedAuth, Controller.RenderDetailCategory);

router.use(dataErrors);
module.exports = router;
