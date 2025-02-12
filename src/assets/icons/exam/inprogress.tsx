import { SVGProps } from "react";

const ExamItemInProgressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5742 8C16.5742 12.4183 12.9925 16 8.57422 16C4.15594 16 0.574219 12.4183 0.574219 8C0.574219 3.58172 4.15594 0 8.57422 0C12.9925 0 16.5742 3.58172 16.5742 8Z"
      fill="#FCE3B4"
      fillOpacity="0.6"
    />
    <path
      d="M11.5742 8C11.5742 9.65685 10.2311 11 8.57422 11C6.91736 11 5.57422 9.65685 5.57422 8C5.57422 6.34315 6.91736 5 8.57422 5C10.2311 5 11.5742 6.34315 11.5742 8Z"
      fill="#FFC352"
    />
  </svg>
);

export default ExamItemInProgressIcon;
