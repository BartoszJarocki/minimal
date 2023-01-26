import React from "react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 200 200"
    >
      <path
        fill="#1F1F1F"
        d="M200 29.42C200 13.182 186.818 0 170.58 0H29.42C13.182 0 0 13.182 0 29.42v141.16C0 186.818 13.182 200 29.42 200h141.16c16.238 0 29.42-13.182 29.42-29.42V29.42z"
      ></path>
      <text
        x="28.501"
        y="50.1"
        fill="#fafafa"
        fontFamily="'Inter-Bold', 'Inter'"
        fontSize="144"
        fontWeight="700"
        transform="matrix(.87336 0 0 .88418 17.586 102.002)"
      >
        M
      </text>
    </svg>
  );
};
