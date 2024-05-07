import { DataNotes } from "@/interface/Notes";
import { Toast } from "react-hot-toast";

export type ParamsListDataSearch = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  totalPage: number;
  error: boolean;
  isLoading: boolean;
  notes: DataNotes[];
};

export type CustomPopupProps = {
  customRef:
    | React.MutableRefObject<any>
    | React.RefObject<any>
    | null
    | (() => void);
  children: React.ReactNode;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
};

export type CustomButtonProps = {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className?: string;
  loading?: boolean;
};

export type NotifyProps = {
  image: string;
  classAnimated?: boolean;
  title: string;
  content?: string;
};

export type NotifyComponentProps = {
  t: Toast;
  image: string;
  classAnimated?: boolean;
  content?: string;
  title: string;
};

interface AcceptedFiles {
  extensions: string[];
  type: string;
}

export type FileUploaderProps = {
  setInputs: React.Dispatch<React.SetStateAction<{}>>;
  acceptedFiles: AcceptedFiles
  name: string;
  value: File | File[] | null | string;
  width?: string;
  label?: string;
  titleAcceptFile?: string;
  height?: string;
  imageDisplay?: string;
}

export type DarkModeContextProps = {
  theme: 'dark' | 'light' | 'system';
  handleChangeTheme: () => void;
};