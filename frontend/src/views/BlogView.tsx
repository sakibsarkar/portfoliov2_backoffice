import BlogCard from "@/components/Cards/BlogCard";
import { Button } from "@/components/ui/button";
import DashboardHeading from "@/components/UIelements/DashboardHeading";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blog.api";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogView = () => {
  const { data } = useGetAllBlogsQuery(undefined);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[25px]">
      <DashboardHeading
        title="Mange your blogs"
        description="Manage blog add new blog, edit and delete them"
      />

      <Button
        onClick={() => navigate("create")}
        className="center gap-[10px] w-fit"
        variant={"outline"}
      >
        Add New Blog
        <Plus className="mr-2 h-4 w-4" />
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[25px]">
        {data?.data?.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

export default BlogView;
