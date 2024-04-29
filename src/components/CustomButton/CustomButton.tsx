
import { CustomButtonProps } from "@/types/components.types";
import Image from "next/image";

const CustomButton = ({
  disabled,
  onClick = () => {},
  label,
  className,
  loading,
}: CustomButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${className} flex items-center justify-center gap-2`}
    >
      {label}
      {loading && (
        <Image
          src="/icons/loadData.svg"
          alt="loading"
          width={16}
          height={16}
          className="animate-spin"
        />
      )}
    </button>
  );
};

export default CustomButton;
