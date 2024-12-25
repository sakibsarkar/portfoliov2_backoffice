import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import AppError from "../error/AppError";
import Project from "../models/project.model";

const createProject = catchAsyncError(async (req, res) => {
  const body = req.body;
  const result = await Project.create(body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Project created successfully",
  });
});

const getProjects = catchAsyncError(async (req, res) => {
  const result = await Project.find();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Projects retrieved successfully",
  });
});
const getProjectByProjectId = catchAsyncError(async (req, res) => {
  const { projectId } = req.params;
  const result = await Project.findById(projectId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Project retrieved successfully",
  });
});

const updateProjectByProjectId = catchAsyncError(async (req, res) => {
  const { projectId } = req.params;
  const body = req.body;
  const result = await Project.findByIdAndUpdate(projectId, body, {
    new: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Project updated successfully",
  });
});

const deleteProjectByProjectId = catchAsyncError(async (req, res) => {
  const { projectId } = req.params;
  const isExist = await Project.findById(projectId);

  if (!isExist) {
    throw new AppError(404, "Project not found");
  }
  const result = await Project.findByIdAndDelete(isExist._id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Project deleted successfully",
  });
});

const projectController = {
  createProject,
  getProjects,
  updateProjectByProjectId,
  deleteProjectByProjectId,
  getProjectByProjectId,
};

export default projectController;
