import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import QueryBuilder from "../builder/QueryBuilder";
import Blog from "../models/blog.model";

const createBlog = catchAsyncError(async (req, res) => {
  const body = req.body;
  const result = await Blog.create(body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Blog created successfully",
  });
});

const getBlogs = catchAsyncError(async (req, res) => {
  const model = Blog.find();
  const query = req.query;
  const queryBuilder = new QueryBuilder(model, query)
    .filter()
    .search(["title", "description", "content"])
    .sort()
    .paginate()
    .fields();
  const totalDoc = (await queryBuilder.count()).totalCount;
  const result = await queryBuilder.modelQuery;
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Blogs retrieved successfully",
    totalDoc,
  });
});

const getBlogByBlogId = catchAsyncError(async (req, res) => {
  const { blogId } = req.params;
  const result = await Blog.findById(blogId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Blog retrieved successfully",
  });
});

const updateBlogByBlogId = catchAsyncError(async (req, res) => {
  const { blogId } = req.params;
  const body = req.body;
  const result = await Blog.findByIdAndUpdate(blogId, body, {
    new: true,
    runValidators: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Blog updated successfully",
  });
});

const deleteBlogByBlogId = catchAsyncError(async (req, res) => {
  const { blogId } = req.params;
  const result = await Blog.findByIdAndDelete(blogId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Blog deleted successfully",
  });
});

const blogController = {
  createBlog,
  getBlogs,
  updateBlogByBlogId,
  deleteBlogByBlogId,
  getBlogByBlogId,
};

export default blogController;
