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
      <path
        fill="#FAFAFA"
        fillRule="nonzero"
        d="M37.604-54.627H64.91l28.841 70.363h1.228l28.84-70.363h27.307V50.1h-21.477v-68.165h-.869l-27.103 67.653H87.052L59.95-18.321h-.869V50.1H37.604V-54.627z"
        transform="matrix(.87336 0 0 .88418 17.586 102.002)"
      ></path>
    </svg>
  );
};
