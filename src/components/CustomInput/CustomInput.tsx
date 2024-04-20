import { useRef, useState, KeyboardEvent } from "react";
import { CustomInputProps } from "./utils/CustomInputProps.type";

const CustomInput: React.FC<CustomInputProps> = ({
  disabled = false,
  className = "",
  type,
  placeholder,
  label,
  defaultValue,
  width,
  rows,
  name,
  onChange,
  onChangeTextArea,
  min,
  id,
  value,
  isRequeried = false,
  labelFontSize = "14px",
}) => {
  const messageError = "Este campo es obligatorio";
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      (event.key === "Enter" || event.key === "Tab") &&
      isRequeried &&
      !value
    ) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div>
      {label && (
        <p
          className={`text-[${labelFontSize}] text-left font-medium pb-2`}
        >
          {label}
        </p>
      )}
      {type === "textarea" ? (
        <textarea
          className={`placeholder:text-light-gray ${className}`}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          name={name}
          onChange={onChangeTextArea}
          defaultValue={defaultValue}
          id={id}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <input
          className={`placeholder:text-light-gray ${className}`}
          disabled={disabled}
          type={type}
          width={width}
          placeholder={placeholder}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          id={id}
          min={min}
          value={value}
          required={isRequeried}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      )}
      {showError && <p className="text-red-500 text-xs">{messageError}</p>}
    </div>
  );
};

export default CustomInput;
