import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";

interface TechStackInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TechStackInput({ value, onChange }: TechStackInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        const hasValue = value.some(
          (item) => item.toLowerCase() === inputValue.toLowerCase().trim()
        );
        if (hasValue) {
          toast.error(`"${inputValue}" already exists`);
          return;
        }
        const newValue = [...value, inputValue.trim()];
        onChange(newValue);
        setInputValue("");
      }
    }
  };

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tech stack (Ctrl + Enter to add)"
      />
    </div>
  );
}
