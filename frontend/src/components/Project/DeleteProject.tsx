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
import { useDelteProjectByIdMutation } from "@/redux/features/project/project.api";
import { AlertCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

interface IProps {
  projectName: string;
  projectId: string;
}
const DeleteProject: React.FC<IProps> = ({ projectName, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");

  const [deleteProjectById, { isLoading }] = useDelteProjectByIdMutation();

  const handleConfirmDelete = async () => {
    if (confirmationText !== projectName) {
      setError("Project name doesn't match. Please try again.");
      return;
    }

    if (isLoading) return;
    try {
      const res = await deleteProjectById(projectId);
      const error = res.error as any;
      if (error) {
        toast.error(
          error.data.message || "Something went wrong while deleting project"
        );
        setIsOpen(false);
        setConfirmationText("");
        setError("");
        return;
      }

      toast.success("Project deleted successfully");
      setIsOpen(false);
      setConfirmationText("");
      setError("");
    } catch (error) {}
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full w-[30px] h-[30px] center p-[0]"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-destructive flex items-center">
            <Trash2 className="mr-2 h-6 w-6" />
            Delete Project
          </DialogTitle>
          <DialogDescription className="text-base">
            This action cannot be undone. This will permanently delete the
            project
            <span className="font-semibold"> "{projectName}" </span>
            and remove all of its contents from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="projectName" className="text-sm font-medium">
              To confirm type{" "}
              <span className="bg-destructive/10 text-destructive font-[700] px-[4px] rounded-[2px]">
                {projectName}
              </span>{" "}
              in the field below
            </Label>
            <Input
              id="projectName"
              value={confirmationText}
              onChange={(e) => {
                setConfirmationText(e.target.value);
                setError("");
              }}
              placeholder={projectName}
              className="border-destructive/50 focus:border-destructive"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={confirmationText !== projectName || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                Deleting...
                <FaSpinner className="animate-spin" />
              </>
            ) : (
              "I understand, delete this project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;
