import { IBlog } from "@/types/blog";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DeleteBlog from "../Blog/DeleteBlog";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
interface IProps {
  blog: IBlog;
}
const BlogCard: React.FC<IProps> = ({ blog }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative center">
        <img src={blog.thumbnail} alt={blog.title} className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 line-clamp-3">{blog.description}</p>
        <Badge>{format(new Date(blog.createdAt), "dd MMM yyyy")}</Badge>

        <div className="flex items-center justify-end gap-[15px]">
          <Link
            to={`update/${blog._id}`}
            className="text-[#282828] font-[700] text-[15px] hover:underline"
          >
            Edit
          </Link>

          <DeleteBlog blogName={blog.title} blogId={blog._id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
