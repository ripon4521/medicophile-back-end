import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { skillService } from "./skill.service";


const createSkill = catchAsync( async ( req, res ) =>{
    const payload = req.body;
    const result = await skillService.createSkill(payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Skill Created Successfully',
        data: result,
    })
});


const getSkills = catchAsync(async (req, res) => {
    const skills = await skillService.getAllSkills();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Skills retrieved successfully',
        data: skills,
    })

});

const getSingleSkillById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const skill = await skillService.getSkillById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Skill retrieved successfully',
        data: skill,
    })
});

const updateSkillById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const skill = await skillService.updateSkill(id, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Skill updated successfully',
        data: skill,
    })
});


const deleteSkillById = catchAsync(async (req, res) => {
    const { id } = req.params;
    await skillService.deleteSkill(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Skill deleted successfully',
        data: undefined,
    })
});






export const skillController = {
    createSkill,
    getSkills,
    getSingleSkillById,
    updateSkillById,
    deleteSkillById,
}