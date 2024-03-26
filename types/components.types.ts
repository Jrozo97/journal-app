import { DataNotes } from "@/interface/Notes";

export type ParamsListDataSearch = {

    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    totalPage: number;
    error:  boolean;
    isLoading: boolean;
    notes: DataNotes[];

}