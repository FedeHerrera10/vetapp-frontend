import { Link } from "react-router-dom";
import BrandIcon from "../../assets/img/brand.svg";

export const BrandLink = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 rtl:space-x-reverse mx-auto w-32"
    >
      <img src={BrandIcon} alt="brand-icon" className="size-8" />
      <p className="self-center text-2xl font-semibold whitespace-nowrap">
        Vet<span className="text-indigo-500">App</span>
      </p>
    </Link>
  );
};
