import { DataNotes } from "./Notes";

export interface OptionItem {
    id: number;
    name: string;
    icon: React.ReactNode;
    handlerOption: () => void;
}

export interface MenuActionsProps {
    options: OptionItem[];
}

export interface ResponseDataNote {
    ok: boolean;
    note: DataNotes;
}