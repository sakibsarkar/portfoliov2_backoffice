"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const QueryBuilder_1 = __importDefault(require("../builder/QueryBuilder"));
const blog_model_1 = __importDefault(require("../models/blog.model"));
const createBlog = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield blog_model_1.default.create(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Blog created successfully",
    });
}));
const getBlogs = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const model = blog_model_1.default.find();
    const query = req.query;
    const queryBuilder = new QueryBuilder_1.default(model, query)
        .filter()
        .search(["title", "description", "content"])
        .sort()
        .paginate()
        .fields();
    const totalDoc = (yield queryBuilder.count()).totalCount;
    const result = yield queryBuilder.modelQuery;
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Blogs retrieved successfully",
        totalDoc,
    });
}));
const getBlogByBlogId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_model_1.default.findById(blogId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Blog retrieved successfully",
    });
}));
const updateBlogByBlogId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const body = req.body;
    const result = yield blog_model_1.default.findByIdAndUpdate(blogId, body, {
        new: true,
        runValidators: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Blog updated successfully",
    });
}));
const deleteBlogByBlogId = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_model_1.default.findByIdAndDelete(blogId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "Blog deleted successfully",
    });
}));
const blogController = {
    createBlog,
    getBlogs,
    updateBlogByBlogId,
    deleteBlogByBlogId,
    getBlogByBlogId,
};
exports.default = blogController;
