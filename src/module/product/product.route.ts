import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import { productController } from "./product.controller";
import { authUser } from "../../middlewares/auth";

const productRouter = Router();
productRouter.post(
  "/create-product",
  authUser("admin","superAdmin","teacher"),
  validateRequest(productValidation.createProductSchema),
  productController.createProduct,
);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:slug", productController.getSingleProduct);
productRouter.patch(
  "/:slug", authUser("admin","superAdmin","teacher"),
  validateRequest(productValidation.updateProductSchema),
  productController.updateProduct,
);
productRouter.delete("/:slug",authUser("admin","superAdmin","teacher"), productController.deleteProduct);
export default productRouter;
