import { SVGProps } from "react";

const GeminiIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      focusable="false"
      viewBox="0 -960 960 960"
      height="28"
      width="28"
      fill="currentColor"
      {...props}
    >
      <path d="M480-80q2,0 2-2q0-82 31-154t85-126t126-85t154-31q2,0 2-2t-2-2q-82,0-154-31T598-598T513-724T482-878q0-2-2-2t-2,2q0,82-31,154T362-598T236-513T82-482q-2,0-2,2t2,2q82,0 154,31t126,85t85,126T478-82q0,2 2,2Z"></path>
    </svg>
  );
};

export default GeminiIcon;
