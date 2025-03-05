import { IPreOrder } from "./preorder.interface";
import { PreOrderModel } from "./preorder.model";

const createPreorderIntoDb = async(payload:IPreOrder) => {
    const result = await PreOrderModel.create(payload);
    return result;
}

const getAllPreorders = async() => {
    const result = await PreOrderModel.find().populate('user').populate('selected_meals_id');
    return result;
}

const getPreorderById = async(_id: string) => {
    const result = await PreOrderModel.findOne({_id}).populate('user').populate('selected_meals_id');
    return result;
}

const updatePreorderById = async(_id: string, payload: Partial<IPreOrder>) => {
    const result = await PreOrderModel.findOneAndUpdate({_id}, payload, { new: true });
    return result;
}

const deletePreorderById = async(_id: string) => {
    const result = await PreOrderModel.findOneAndUpdate({_id});
    return result;
}

export const preorderService = {
    createPreorderIntoDb,
    getAllPreorders,
    getPreorderById,
    updatePreorderById,
    deletePreorderById,
 
}