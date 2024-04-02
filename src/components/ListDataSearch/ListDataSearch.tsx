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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import MenuActions from "../MenuActions/MenuActions";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { formatTime } from "@/src/utils/utilsFunctions";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../CustomButton/CustomButton";
import CustomPopup from "../CustomPopup";
import CreateNotes from "@/src/modules/CreateNotes";

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

  const handleChangePage = (newPage: number) => {
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
          classNameButton="bg-primary text-white rounded-lg px-11  w-auto h-8"
          onClick={toggleCreateNote}
        />
        <CustomPopup customRef={createNote} closeOnEscape={false} >
          <CreateNotes
            onClose={toggleCreateNote}
          />
        </CustomPopup>
      
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <Box
            sx={{ width: "584px", height: "50vh" }}
            className="flex justify-center items-center h-"
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="h-auto w-full">
              {notes?.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                  {/* <Image
                    src="/icons/errorSearch.svg"
                    alt="errorSearch"
                    className="w-96"
                    width={152}
                    height={152}
                  /> */}
                  <p className="text-xl font-semibold"> ¡Ocurrio un error! </p>
                  <p className="text-lg font-normal">
                    No se encontraron resultados
                  </p>
                </div>
              ) : (
                <div className="w-full h-auto grid grid-cols-5 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {notes?.map((note) => {
                    console.log("noteDate", note.date);
                    const dateFormated = note.date ? new Date(note.date) : null;
                    const convertDate = formatTime(dateFormated as Date);
                    console.log("convertDate", convertDate);

                    const optionsListData = [
                      {
                        id: 1,
                        name: "Editar nota",
                        icon: <EditNoteIcon />,
                        handlerOption: () =>
                          console.log("Editar nota", note.id),
                      },
                      {
                        id: 2,
                        name: "Eliminar nota",
                        icon: <DeleteForeverIcon />,
                        handlerOption: () =>
                          console.log("Eliminar nota", note.id),
                      },
                    ];
                    return (
                      <div
                        key={note.id}
                        className="w-full h-56 rounded-lg shadow-custom-tooltip px-4 pt-4 pb-3 flex flex-col gap-4 items-center"
                      >
                        <Image
                          src="/icons/iconNotes.svg"
                          alt="search"
                          width={152}
                          height={152}
                          className="xl"
                        />
                        <div className="w-full flex justify-between items-center">
                          <div className="flex flex-col">
                            <p className="text-xs font-medium">{note.title}</p>
                            <p className="text-[10px] font-medium">
                              {convertDate}
                            </p>
                          </div>
                          <MenuActions options={optionsListData} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <Stack spacing={3} className="items-center">
              <Pagination
                count={totalPage}
                color="standard"
                page={page}
                onChange={(event, newPage) => handleChangePage(newPage)}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDataSearch;
