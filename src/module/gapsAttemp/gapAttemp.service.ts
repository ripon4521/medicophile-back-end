import GapAttempModel from "./gapAttemp.model"

const getAllGapAttemp = async() => {
    const result = await GapAttempModel.find({isDeleted:false});
    return result;
}

export const gapAttempService = {
    getAllGapAttemp
}