import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "@/components/UIelements/TextEditor";
import { useCreateBlogMutation } from "@/redux/features/blog/blog.api";
import { useUploadSingleImageMutation } from "@/redux/features/upload/upload.api";
import { IBlog } from "@/types/blog";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const CreateBlogView = () => {
  const [formData, setFormData] = useState<Omit<IBlog, "_id" | "createdAt">>({
    title: "",
    content: "",
    description: "",
    thumbnail: "",
  });
  const navigate = useNavigate();

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [uploadSingle, { isLoading: isImageUploading }] =
    useUploadSingleImageMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (isImageUploading) return;

    const toastId = toast.loading("Image uploading...");
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await uploadSingle(form);
      const error = res.error as any;
      if (error) {
        toast.dismiss(toastId);
        toast.error(
          error.data.message || "Something went wrong while uploading image"
        );
        return;
      }

      const data = res.data;
      const image = data?.data || "";
      setFormData((prev) => ({ ...prev, thumbnail: image }));
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong while uploading image");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    try {
      const res = await createBlog(formData);

      const error = res.error as any;

      if (error) {
        toast.error(
          error.data.message || "Something went wrong while creating blog"
        );
        return;
      }
      navigate("/dashboard/blog");
      setFormData({
        title: "",
        content: "",
        description: "",
        thumbnail: "",
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-start mb-[15px]">
          <Link to="/dashboard/blog" className="center gap-[15px]">
            <ArrowLeft className="h-4 w-4" />
            GO BACK
          </Link>
        </div>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
          <div className="">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter a brief description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>

            <TextEditor
              defaultValue={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              height={400}
            />
          </div>

          <div className="mt-[60px]">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("thumbnail")?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {formData.thumbnail && (
              <div className="mt-4">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="max-w-[200px] rounded-lg"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Blog...
              </>
            ) : (
              "Create Blog"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlogView;
