import { SVGProps } from "react";

const Donut = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="199"
      height="199"
      viewBox="0 0 199 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1867_5001)">
        <path
          d="M99.501 0C44.5482 0 0 44.5482 0 99.501C0 154.454 44.5482 199.002 99.501 199.002C154.454 199.002 199.002 154.454 199.002 99.501C199.002 44.5482 154.452 0 99.501 0ZM99.501 163.753C64.0164 163.753 35.2492 134.986 35.2492 99.501C35.2492 64.0164 64.0144 35.2492 99.501 35.2492C134.988 35.2492 163.753 64.0164 163.753 99.501C163.753 134.986 134.986 163.753 99.501 163.753Z"
          fill="#D9F0FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1867_5001">
          <rect width="199" height="199" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Donut;
