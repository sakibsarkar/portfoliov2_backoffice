"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateExperienceByIdMutation } from "@/redux/features/expereince/expereince.api";
import { IExperience } from "@/types/experience";
import { Edit } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { TechStackInput } from "../Project/TechStackInput";

interface IProps {
  experience: IExperience;
}

export function UpdateExperience({ experience }: IProps) {
  const [formData, setFormData] = useState<IExperience>(experience);
  const [isOpen, setIsOpen] = useState(false);

  const [updateExperienceById, { isLoading }] =
    useUpdateExperienceByIdMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }
    try {
      const res = await updateExperienceById({
        experienceId: experience._id,
        payload: formData,
      });
      const error = res.error as any;

      if (error) {
        toast.error(
          error.data.message || "Something went wrong while updating experience"
        );
        return;
      }

      setIsOpen(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Something went wrong while updating experience");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="p-[0] w-[30px] h-[30px] center rounded-full"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[60vw] h-[90vh] overflow-auto smoothBar">
        <DialogHeader>
          <DialogTitle>Update Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Input
              id="period"
              name="period"
              value={formData.period}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>

            <TechStackInput
              value={formData.skills}
              onChange={(skills) =>
                setFormData((prev) => ({ ...prev, skills }))
              }
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="center gap-[10px]"
          >
            Save Changes
            {isLoading ? <FaSpinner className="animate-spin" /> : ""}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
