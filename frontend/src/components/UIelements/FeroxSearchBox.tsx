import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface IProps {
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const FeroxSearchBox: React.FC<IProps> = ({
  onValueChange,
  className,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSerch = () => {
    onValueChange(searchTerm);
  };

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    const value = e.currentTarget.value;
    if (keyCode === 13) {
      onValueChange(value);
    }
    setSearchTerm(value);
  };

  return (
    <div
      className={`w-[500px] flex items-start md:items-center flex-col md:flex-row gap-[5px] ${
        className || ""
      }`}
    >
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        onKeyUp={handleChange}
        onBlur={handleSerch}
        className="w-full"
      />
      <Button onClick={handleSerch} className="shink-0 " variant={"outline"}>
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

export default FeroxSearchBox;
