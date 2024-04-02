// CustomInput.types.ts
import { ChangeEvent } from "react";

export type CustomInputProps = {
  disabled?: boolean;
  className?: string;
  type: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  width?: string;
  rows?: number;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  min?: number;
  id?: string;
  value?: string;
  isRequeried?: boolean;
  labelFontSize?: string;
};
