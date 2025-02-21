import { SVGProps } from "react";
const StreakMiss = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="36"
    height="48"
    viewBox="0 -6 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="18" cy="18" r="18" fill="#CCCCCC" />
    <path
      d="M24 12L12 24M12 12L24 24"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default StreakMiss;
