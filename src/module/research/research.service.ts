import { IResearch } from "./research.interface";
import ResearchModel from "./research.model";


const createResearchIntoDB = async (payload: IResearch ) => {
    const result = await ResearchModel.create(payload)
    return result;
}
const getAllResearch = async () => {
    const result = await ResearchModel.find();
    return result;
}

const getResearchById = async (_id: string) => {
    const result = await ResearchModel.findOne({ _id });
    return result;
}


const updateResearchById = async (_id: string, payload: Partial<IResearch>) => {
    try {
        const researchStudent = await ResearchModel.findByIdAndUpdate(
            _id,
            payload,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!researchStudent) {
            throw new Error("researchStudent not found");
        }
        return researchStudent;

    } catch (error) {
        throw new Error(`Transaction failed:`);
    }
};

const deleteResearchById = async (_id: string) => {
    try {
        // Faculty ke find kore check kora
        const research = await ResearchModel.findOne({ _id });
        if (!research) {
            throw new Error("research not found");
        }
        return { message: "research and associated user deleted successfully" };
    } catch (error) {
        throw new Error(`research failed:`);
    }
};

export const researchService = {
    createResearchIntoDB,
    getAllResearch,
    getResearchById,
    updateResearchById,
    deleteResearchById,

}