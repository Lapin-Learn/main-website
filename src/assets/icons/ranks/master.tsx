import { SVGProps } from "react";

const MasterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3.2 18.2H20L21.2 7.4L16.4 11L11.6 5L6.8 11L2 7.4L3.2 18.2Z" fill="#E8CE44" />
    <path d="M3.2 18.2H11.6V5L6.8 11L2 7.4L3.2 18.2Z" fill="#FFE24B" />
  </svg>
);

export default MasterIcon;
