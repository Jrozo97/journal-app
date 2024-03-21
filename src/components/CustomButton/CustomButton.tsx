import Image from "next/image";
import { CustomButtonProps } from "./utils/CustomButtonProps.type";

const CustomButton: React.FC<CustomButtonProps> = ({
  disabled,
  onClick,
  label,
  color = "white",
  classNameButton,
  loading,
  classText,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      color={color}
      className={classNameButton}
    >
      <p className={`flex flex-row justify-center gap-4 ${classText}`}>
        {label}
        {loading && (
          <Image
            src="/icons/loadData.svg"
            alt="loading"
            width={24}
            height={24}
            className="animate-spin"
          />
        )}
      </p>
    </button>
  );
};

export default CustomButton;
