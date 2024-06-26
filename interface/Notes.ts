export type ParamsQueryNotes = {
  page?: number;
  search?: string;
  limit?: number;
};

export type DataCreateNote = {
  title?: string;
  content?: string;
  img?: string;
  userId?: string;
};

export interface ListNotes {
  notes?: DataNotes[];
  page?: number;
  totalPage?: number;
  totalRecords?: number;
  error?: boolean;
}

export interface DataNotes {
  title?: string;
  content?: string;
  date?: string;
  img?: string;
  user?: string;
  id?: string;
}
