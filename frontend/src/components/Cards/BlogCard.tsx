import { IBlog } from "@/types/blog";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
interface IProps {
  blog: IBlog;
}
const BlogCard: React.FC<IProps> = ({ blog }) => {
  return (
    <Card className="bg-[#161b22] border-[#30363d] hover:border-[#00ffff] transition-colors overflow-hidden">
      <div className="aspect-video relative">
        <img src={blog.thumbnail} alt={blog.title} className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-2 line-clamp-3">{blog.description}</p>
        <p className="text-[#00ffff] text-sm">
          {format(new Date(blog.createdAt), "dd MMM yyyy")}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
