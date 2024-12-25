"use client";

import { Check, Edit, Loader2, UploadIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useUpdateSkillByIdMutation } from "@/redux/features/skill/skill.api";
import { useUploadSingleImageMutation } from "@/redux/features/upload/upload.api";
import { ISkill } from "@/types/skill";
import { getExpertise } from "@/utils/getExpertise";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
interface IProps {
  skill: ISkill;
  trigger?: React.ReactNode;
}

interface IValidation {
  label: string | undefined;
  image: string | undefined;
  expertise: string | undefined;
}

export function UpdateSkill({ skill, trigger }: IProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ISkill>(skill);
  const [errors, setErrors] = useState<IValidation>({
    expertise: undefined,
    label: undefined,
    image: undefined,
  });

  const [uploadSingle, { isLoading: isImageUploading }] =
    useUploadSingleImageMutation();

  const [updateSkillById, { isLoading }] = useUpdateSkillByIdMutation();

  const validateForm = () => {
    const newErrors: IValidation = {
      expertise: undefined,
      label: undefined,
      image: undefined,
    };

    if (!formData.label || formData.label.length < 2) {
      newErrors.label = "Label must be at least 2 characters";
    }

    try {
      new URL(formData.image);
    } catch {
      newErrors.image = "Please enter a valid URL";
    }

    if (formData.expertise < 0 || formData.expertise > 100) {
      newErrors.expertise = "Expertise must be between 0 and 100";
    }

    setErrors(newErrors);
    console.log(newErrors);
    const error = Object.values(newErrors).find((error) => error !== undefined);

    return !error; // return true if there are no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const res = await updateSkillById({
        skillId: skill._id,
        payload: formData,
      });

      const error = res.error as any;

      if (error) {
        toast.error(
          error.data.message || "Something went wrong while updating skill"
        );
        return;
      }

      toast.success("Skill updated successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleInputChange = (field: keyof ISkill, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
      setFormData((prev) => ({ ...prev, image: image }));
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong while uploading image");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="p-[0] w-[30px] h-[30px] center rounded-full"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Skill</DialogTitle>
          <DialogDescription>
            Make changes to the skill details here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              placeholder="Enter skill name"
            />
            {errors.label && (
              <p className="text-sm text-destructive">{errors.label}</p>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label
              htmlFor="image"
              className="flex flex-col gap-[10px] cursor-pointer"
            >
              Image
              {formData.image ? (
                <div
                  className="w-[150px] h-[150px] overflow-hidden rounded-[10px] group/image relative
              "
                >
                  <img
                    src={formData.image}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-[0] group-hover/image:opacity-[1] z-[5] center">
                    <UploadIcon className="text-white" />
                  </span>
                </div>
              ) : (
                <div className="w-full h-[100px] bg-white border-[1px] border-input rounded-[10px] center flex-col gap-[15px]">
                  <UploadIcon className="text-[#1A1A1A] w-[30px] h-[30px]" />
                  <p>Upload image</p>
                </div>
              )}
            </Label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-col gap-[15px]">
              <Label>Expertise Level: {formData.expertise}%</Label>
              <Badge className="w-fit">
                {getExpertise(formData.expertise)}
              </Badge>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[formData.expertise]}
              onValueChange={(values) =>
                handleInputChange("expertise", values[0])
              }
            />
            {errors.expertise && (
              <p className="text-sm text-destructive">{errors.expertise}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isLoading && <Check className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
