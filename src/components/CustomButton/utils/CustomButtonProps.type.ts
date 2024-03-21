import { ChangeEvent } from "react";

  export type CustomButtonProps = {
    disabled?: boolean;
    onClick?: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    color?: string;
    classNameButton?: string;
    loading?: boolean;
    classText?: string;
  };