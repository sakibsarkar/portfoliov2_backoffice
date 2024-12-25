import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import AppError from "../error/AppError";
import Skill from "../models/skill.model";

const createSkill = catchAsyncError(async (req, res) => {
  const body = req.body;
  const result = await Skill.create(body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skill created successfully",
  });
});

const getSkills = catchAsyncError(async (req, res) => {
  const result = await Skill.find();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skills retrieved successfully",
  });
});

const updateSkillBySkillId = catchAsyncError(async (req, res) => {
  const { skillId } = req.params;
  const body = req.body;
  const result = await Skill.findByIdAndUpdate(skillId, body, {
    new: true,
    runValidators: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skill updated successfully",
  });
});

const deleteSkillBySkillId = catchAsyncError(async (req, res) => {
  const { skillId } = req.params;
  const isExist = await Skill.findById(skillId);

  if (!isExist) {
    throw new AppError(404, "Skill not found");
  }
  const result = await Skill.findByIdAndDelete(isExist._id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skill deleted successfully",
  });
});

const skillController = {
  createSkill,
  getSkills,
  updateSkillBySkillId,
  deleteSkillBySkillId,
};

export default skillController;
