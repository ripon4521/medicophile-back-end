import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import { productController } from "./product.controller";

const productRouter = Router();
productRouter.post(
  "/create-product",
  validateRequest(productValidation.createProductSchema),
  productController.createProduct,
);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:slug", productController.getSingleProduct);
productRouter.patch(
  "/:slug",
  validateRequest(productValidation.updateProductSchema),
  productController.updateProduct,
);
productRouter.delete("/:slug", productController.deleteProduct);
export default productRouter;
