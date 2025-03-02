import { IEvent } from "./event.interface";
import { eventModel } from "./event.model";


const createEventIntoDB = async (payload:IEvent) => {
    const result = await eventModel.create(payload);
    return result;
}   

const getAllEvents = async () => {
    const result = await eventModel.find();
    return result;
}

const getEventById = async (_id: string) => {
    const result = await eventModel.findOne({_id});
    return result;

}

const updateEventById = async (_id: string, payload: IEvent) => {
    const result = await eventModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteEventById = async (_id: string) => {
    const result = await eventModel.findOneAndUpdate({_id});
    return result;
}

export const eventService = { 
    createEventIntoDB,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
}