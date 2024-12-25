import { IVendor } from "@/types/vendor";

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
import { useUploadSingleImageMutation } from "@/redux/features/upload/upload.api";
import { useUpdateVendorByIdMutation } from "@/redux/features/vendor/vendor.api";
import { Edit, LoaderCircle, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  vendor: IVendor;
}

const EditVendor: React.FC<IProps> = ({ vendor }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(vendor?.image || "");
  const [name, setName] = useState(vendor?.name || "");

  const [uploadImage, { isLoading: isImageUploading }] =
    useUploadSingleImageMutation();
  const [updateVendor, { isLoading }] = useUpdateVendorByIdMutation();

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "vendor_image");
    const res = await uploadImage(form);
    const error = res.error;

    if (error) {
      console.log(error);
      return;
    }

    const data = res.data;
    setImage(data.data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please fill all the fields");
    }

    const payload = {
      name,
      image,
    };

    const res = await updateVendor({
      vendorId: vendor._id,
      payload,
    });

    const error = res.error;

    if (error) {
      console.log(error);
      return;
    }

    toast.success("Vendor updated successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-green-400">
          <Edit className="w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Vendor</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={vendor?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="image"
              className="border-[1px] border-input overflow-hidden w-[70px] h-[70px] center bg-slate-100 rounded-[8px] relative"
            >
              {isImageUploading ? (
                <span className="absolute top-0 left-0 w-full h-full bg-[#6e6e6e48] center">
                  <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                ""
              )}
              {image ? (
                <img
                  src={image}
                  alt="image"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Upload />
              )}
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVendor;
