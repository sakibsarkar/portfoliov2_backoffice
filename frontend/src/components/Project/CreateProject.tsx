import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateProjectMutation } from "@/redux/features/project/project.api";
import { useUploadSingleImageMutation } from "@/redux/features/upload/upload.api";
import { IProject } from "@/types/project";
import { format } from "date-fns";
import { CalendarIcon, Plus, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { TechStackInput } from "./TechStackInput";

const initValue: Omit<IProject, "_id"> = {
  description: "",
  end_date: "",
  name: "",
  start_date: "",
  tech_stack: [],
  thumbnail: "",
  github_link: "",
  live_link: "",
};
const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<IProject, "_id">>(initValue);

  const [updateProjectById, { isLoading }] = useCreateProjectMutation();
  const [uploadSingle, { isLoading: isImageUploading }] =
    useUploadSingleImageMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    date: Date | undefined,
    field: "start_date" | "end_date"
  ) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: format(date, "yyyy-MM-dd") }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.tech_stack.length === 0) {
      toast.error("Please add at least one tech stack");
      return;
    }
    try {
      const res = await updateProjectById(formData);

      const error = res.error as any;

      if (error) {
        toast.error(
          error.data.message || "Something went wrong while updating project"
        );
        return;
      }

      setOpen(false);
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      // You might want to show an error message to the user here
    }
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="center gap-[10px] w-fit">
          Add new project <Plus className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vh] max-h-[90vh] overflow-auto smoothBar">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="name">Name</Label>
            <Input
              required={true}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className=""
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label
              htmlFor="thumbnail"
              className="flex flex-col gap-[10px] cursor-pointer"
            >
              Thumbnail
              {formData.thumbnail ? (
                <div
                  className="w-[150px] h-[150px] overflow-hidden rounded-[10px] group/image relative
              "
                >
                  <img
                    src={formData.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-[0] group-hover/image:opacity-[1] z-[5] center">
                    <UploadIcon className="text-white" />
                  </span>
                </div>
              ) : (
                <div className="w-full h-[100px] bg-white border-[1px] border-input rounded-[10px] center flex-col gap-[15px]">
                  <UploadIcon className="text-[#1A1A1A] w-[30px] h-[30px]" />
                  <p>Upload thumbnail</p>
                </div>
              )}
            </Label>

            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex items-center justify-start gap-[10px] w-full">
            <div className="flex flex-col gap-[10px] w-full">
              <Label htmlFor="start_date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.start_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.start_date ? (
                      format(new Date(formData.start_date), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.start_date
                        ? new Date(formData.start_date)
                        : undefined
                    }
                    onSelect={(date) => handleDateChange(date, "start_date")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <Label htmlFor="end_date">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.end_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.end_date ? (
                      format(new Date(formData.end_date), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.end_date
                        ? new Date(formData.end_date)
                        : undefined
                    }
                    onSelect={(date) => handleDateChange(date, "end_date")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="description">Description</Label>
            <Textarea
              required={true}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-[200px]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="tech_stack">Tech Stack</Label>
            <div className="">
              <TechStackInput
                value={formData.tech_stack}
                onChange={(newTechStack) =>
                  setFormData((prev) => ({ ...prev, tech_stack: newTechStack }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="live_link">Live Link</Label>
            <Input
              required={true}
              id="live_link"
              name="live_link"
              value={formData.live_link}
              onChange={handleInputChange}
              className=""
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="github_link">GitHub Link</Label>
            <Input
              required={true}
              id="github_link"
              name="github_link"
              value={formData.github_link}
              onChange={handleInputChange}
              className=""
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-4 center gap-[4px]"
          >
            Update Project
            {isLoading ? <FaSpinner className="animate-spin" /> : ""}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
