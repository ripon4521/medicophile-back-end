import { ISkill } from "./skill.interface";
import { SkillModel } from "./skill.model";



const createSkill = async (payload:ISkill) =>{
    const result = await SkillModel.create(payload);
    return result;
}

const getAllSkills = async ()=>{
    const result = await SkillModel.find();
    return result;
}

const getSkillById = async (_id: string) =>{
    const result = await SkillModel.findOne({_id});
    return result;
}

const updateSkill = async (_id: string, payload: ISkill) =>{
    const result = await SkillModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteSkill = async (_id: string) =>{
    const result = await SkillModel.findOneAndDelete({_id});
    return result;
}


export  const skillService ={
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
}