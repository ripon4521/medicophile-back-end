import { IBus } from "./bus.interface";
import { busModel } from "./bus.model";


const createBusIntoDB = async(payload:IBus) => {
    const result = await busModel.create(payload);
    return result;
}


const getAllBusDataFromDB = async() => {
    const result = await busModel.find();
    return result;
}

const updateBusDataInDB = async(_id:string, payload:Partial<IBus>) => {
    const result = await busModel.findOneAndUpdate({_id}, payload, { new: true });
    return result;
}

const deleteBusDataFromDB = async(_id:string) => {
    const result = await busModel.findOneAndDelete({_id});
    return result;
}

const getSingleBusDataFromDBById = async(_id:string) => {
    const result = await busModel.findOne({_id});
    return result;
}

export const busService = {
    createBusIntoDB,
    getAllBusDataFromDB,
    updateBusDataInDB,
    deleteBusDataFromDB,
    getSingleBusDataFromDBById,
}
