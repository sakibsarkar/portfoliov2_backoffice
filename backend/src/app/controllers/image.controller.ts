import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";

const uploadMutilpleImages = catchAsyncError(async (req, res) => {
  const files = req.files;
  if (!files) {
    sendResponse(res, {
      data: null,
      success: false,
      message: "File not found",
    });
    return;
  }
  const urls = (files as any[]).map((file) => file.path);
  sendResponse(res, {
    data: urls,
    success: true,
    message: "File uploaded successfully",
    statusCode: 200,
  });
});
const uploadSingleImage = catchAsyncError(async (req, res) => {
  const file = req.file;
  if (!file) {
    sendResponse(res, {
      data: null,
      success: false,
      message: "File not found",
    });
    return;
  }
  const url = file.path;
  sendResponse(res, {
    data: url,
    success: true,
    message: "File uploaded successfully",
    statusCode: 200,
  });
});

export const imageController = {
  uploadMutilpleImages,
  uploadSingleImage,
};
