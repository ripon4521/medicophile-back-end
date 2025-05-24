import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import { productController } from "./product.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const productRouter = Router();
productRouter.post(
  "/create-product",
  authUser("admin","superAdmin","teacher"), onlyAdminAndFacultyAndStudent("admin", "superAdmin"),
  validateRequest(productValidation.createProductSchema),
  productController.createProduct,
);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:slug", productController.getSingleProduct);
productRouter.patch(
  "/:slug", authUser("admin","superAdmin","teacher"),onlyAdminAndFacultyAndStudent("admin", "superAdmin"),
  validateRequest(productValidation.updateProductSchema),
  productController.updateProduct,
);
productRouter.delete("/:slug",authUser("admin","superAdmin","teacher"), onlyAdminAndFacultyAndStudent("admin", "superAdmin"), productController.deleteProduct);
export default productRouter;
