import { CSSProperties, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "../provider/ThemeProvider";
interface IProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  height?: number;
}

const TextEditor: React.FC<IProps> = ({
  className,
  defaultValue,
  onChange,
  style,
  height,
}) => {
  const editorHeight = height || 200;
  const theme = useTheme();

  const [value, setValue] = useState(defaultValue || "");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      style={{
        height: editorHeight + "px",
        background: theme.theme === "light" ? "white" : "#1c1c1c",
        color: theme.theme === "light" ? "black" : "white",
        ...style,
      }}
      className={className || ""}
      theme="snow"
      value={value}
      onChange={(e) => {
        setValue(e);
        onChange && onChange(e || "");
      }}
    />
  );
};

export default TextEditor;
