import QueryBuilder from "../../builder/querybuilder";
import OrderDetailsModel from "./orderDetails.model";


const getAllOrderDetailsFromDb = async (query: Record<string, unknown>) => {
  
    const courseQuery = new QueryBuilder(OrderDetailsModel, query)
      .search(["name", "address"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate({
        path: "productId",
      })
     

  
    const result = await courseQuery.exec(); 
    return result;
  };


export const orderDetailsService = {
    getAllOrderDetailsFromDb
}