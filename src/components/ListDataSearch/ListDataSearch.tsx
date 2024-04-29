import { ParamsListDataSearch } from "@/types/components.types";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../CustomButton/CustomButton";
import CustomPopup from "../CustomPopup";
import CreateNotes from "@/src/modules/CreateNotes";
import NoteList from "../NoteList";
import Image from "next/image";

const ListDataSearch: React.FC<ParamsListDataSearch> = ({
  setPage,
  page,
  setSearch,
  totalPage,
  error,
  isLoading,
  notes,
}) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const createNote = useRef();

  const toggleCreateNote = () => {
    (createNote.current as any).toggle();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setInputSearch(e.target.value);

    const newTimeout = window.setTimeout(() => {
      setSearch(e.target.value);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const handleDeleteSearch = () => {
    setInputSearch("");
    setSearch("");
  };

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-full flex flex-col mt-16">
      <div className="flex w-ful justify-between mb-8 item">
        <TextField
          label="Buscar usuario"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {inputSearch === "" ? (
                  <SearchIcon />
                ) : (
                  <ClearIcon
                    onClick={() => handleDeleteSearch()}
                    className="cursor-pointer"
                  />
                )}{" "}
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ width: "360px" }}
          value={inputSearch}
          onChange={handleSearch}
          className="cursor-pointer"
        />
        <CustomButton
          label="Agregar Nota"
          className="bg-primary text-white rounded-lg px-11 w-auto py-2 "
          onClick={toggleCreateNote}
        />
        <CustomPopup customRef={createNote} closeOnEscape={false}>
          <CreateNotes onClose={toggleCreateNote} />
        </CustomPopup>
      </div>

      <div className="flex flex-col w-full">
        {isLoading ? (
          <Box
            sx={{ width: "584px", height: "50vh" }}
            className="flex flex-col justify-center items-center self-center"
          >
            <CircularProgress />
            <p className="text-xl mt-3">Cargando...</p>
          </Box>
        ) : (
          <div className="flex flex-col gap-4 h-auto w-full">
            {notes?.length === 0 ? (
              <div className="w-full h-full flex flex-col justify-center items-center gap-6 mt-20">
                <Image
                  src="/icons/iconErrorSearch.svg"
                  alt="errorSearch"
                  width={300}
                  height={300}
                />
                <p className="text-xl font-semibold"> ¡Ocurrio un error! </p>
                <p className="text-lg font-normal">
                  No se encontraron resultados
                </p>
              </div>
            ) : (
              <>
                <NoteList notes={notes} />

                <Stack spacing={3} className="items-center">
                  <Pagination
                    count={totalPage}
                    color="standard"
                    page={page}
                    onChange={handleChangePage}
                  />
                </Stack>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDataSearch;
