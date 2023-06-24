import { use, useEffect } from "react";

interface LemonSqueezyLogoProps {
  className?: string;
}

const LemonSqueezyLogo = (props: LemonSqueezyLogoProps) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill="#FFC233"
        fillRule="evenodd"
        d="M6.929 17.186l7.511 3.472a3.846 3.846 0 011.943 1.983c.898 2.099-.33 4.246-2.255 5.018-1.926.772-3.979.275-4.912-1.908l-3.27-7.664c-.253-.595.384-1.178.983-.901zM7.38 14.938l7.753-2.931c2.577-.974 5.392.869 5.354 3.547l-.003.105c-.055 2.608-2.792 4.36-5.312 3.438l-7.786-2.85a.694.694 0 01-.007-1.31zM6.945 13.922l7.622-3.238C17.1 9.607 17.743 6.377 15.76 4.51a9.026 9.026 0 00-.078-.073c-1.945-1.805-5.16-1.17-6.267 1.208l-3.42 7.347c-.274.585.343 1.189.951.93zM4.983 12.643l2.772-7.599a3.678 3.678 0 00-.076-2.732C6.78.214 4.344-.464 2.42.31.493 1.083-.595 2.84.34 5.023l3.29 7.656c.255.593 1.132.57 1.352-.036z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const BuyButton = () => {
  useEffect(() => {
    // @ts-ignore
    window.createLemonSqueezy();
  }, []);

  return (
    <a
      className="lemonsqueezy-button inline-flex items-center justify-center rounded bg-black py-3 pl-6 pr-4 text-sm font-medium text-white hover:bg-black/80 w-fit"
      href="https://minimalist.lemonsqueezy.com/checkout/"
    >
      <span>Download for free</span>
      <LemonSqueezyLogo className="ml-4 h-4 w-auto" />
    </a>
  );
};
