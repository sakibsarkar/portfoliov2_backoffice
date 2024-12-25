import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import AppError from "../error/AppError";
import Experience from "../models/experience.model";

const createExperience = catchAsyncError(async (req, res) => {
  const body = req.body;
  const result = await Experience.create(body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Experience created successfully",
  });
});

const getExperiences = catchAsyncError(async (req, res) => {
  const result = await Experience.find();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Experiences retrieved successfully",
  });
});

const updateExperienceByExperienceId = catchAsyncError(async (req, res) => {
  const { experienceId } = req.params;
  const body = req.body;
  const result = await Experience.findByIdAndUpdate(experienceId, body, {
    new: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Experience updated successfully",
  });
});

const deleteExperienceByExperienceId = catchAsyncError(async (req, res) => {
  const { experienceId } = req.params;
  const isExist = await Experience.findById(experienceId);

  if (!isExist) {
    throw new AppError(404, "Experience not found");
  }
  const result = await Experience.findByIdAndDelete(isExist._id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Experience deleted successfully",
  });
});

const experienceController = {
  createExperience,
  getExperiences,
  updateExperienceByExperienceId,
  deleteExperienceByExperienceId,
};

export default experienceController;
