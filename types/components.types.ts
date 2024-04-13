import { DataNotes } from "@/interface/Notes";

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
  customRef: React.MutableRefObject<any> | React.RefObject<any> | null | (() => void);
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