export interface OptionItem {
    id: number;
    name: string;
    icon: React.ReactNode;
    handlerOption: () => void;
}

export interface MenuActionsProps {
    options: OptionItem[];
}