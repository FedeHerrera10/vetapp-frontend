import { Link } from "react-router-dom";
import BrandIcon from "../../assets/img/brand.svg";
import BrandIcon2 from "../../assets/img/brand2.svg";
import { FC } from "react";

interface BrandLinkProps {
  isDarkMode?: boolean;
}

export const BrandLink: FC<BrandLinkProps> = ({ isDarkMode }) => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 rtl:space-x-reverse mx-auto w-32"
    >
      <img
        src={isDarkMode ? BrandIcon2 : BrandIcon}
        alt="brand-icon"
        className="size-8"
      />
      <p className="self-center text-2xl font-semibold whitespace-nowrap xl:text-3xl dark:text-slate-700">
        Vet<span className="text-indigo-500 ">App</span>
      </p>
    </Link>
  );
};
