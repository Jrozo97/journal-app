import { ParamsListDataSearch } from "@/types/components.types";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../CustomButton/CustomButton";
import CustomPopup from "../CustomPopup";
import CreateNotes from "@/src/modules/CreateNotes";
import NoteList from "../NoteList";
import Image from "next/image";
import { DarkModeContext } from "@/context/darkModeContext";
import CustomInput from "../CustomInput";

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
  const { theme } = useContext(DarkModeContext);

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
        <CustomInput
          type="text"
          placeholder="Buscar usuario"
          value={inputSearch}
          onChange={handleSearch}
          className="w-80 px-4 py-2 border border-gray rounded-md dark:bg-dark-primary dark:text-white dark:border-dark-gray dark:focus:border-white/60"
        />
        <CustomButton
          label="Agregar Nota"
          className="bg-primary text-white rounded-lg px-11 w-auto py-2 dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"  
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
            <p className="text-xl mt-3 dark:text-white">Cargando...</p>
          </Box>
        ) : (
          <div className="flex flex-col gap-4 h-auto w-full">
            {notes?.length === 0 ? (
              <div className="w-full h-full flex flex-col justify-center items-center gap-10 mt-20">
                <Image
                  src="/icons/iconErrorSearch.svg"
                  alt="errorSearch"
                  width={300}
                  height={300}
                />
                <div className="flex flex-col gap-2 ">
                  <p className="text-xl font-semibold text-center dark:text-white">
                    {" "}
                    ¡Ocurrio un error!{" "}
                  </p>
                  <p className="text-lg font-normal text-center dark:text-white">
                    No se encontraron resultados
                  </p>
                </div>
              </div>
            ) : (
              <>
                <NoteList notes={notes} />

                <Stack spacing={3} className="items-center">
                  <Pagination
                    count={totalPage}
                    color={theme === "dark" ? "primary" : "standard"}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: theme === "dark" ? "white" : "black",
                      },
                    }}
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
