import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";


const createProduct = catchAsync(async (req, res) => {
    const result = await productService.createProduct(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Product Created successfully",
      data: result,
    });
  });

  const updateProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const payload = req.body;
    const result = await productService.updateProduct(slug, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Product updated successfully",
      data: result,
    });
  });
  

  const deleteProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await productService.deleteProduct(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Product deleted successfully",
      data: result,
    });
  });


  const getSingleProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await productService.getSingleProducts(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Single Product get successfully",
      data: result,
    });
  });


  const getAllProducts = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await productService.getAllProductFromDb(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Products get successfully",
      data: result,
    });
  });

  export const productController  = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct
}