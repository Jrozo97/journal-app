import { DataNotes } from "@/interface/Notes";
import { formatTime } from "@/src/utils/utilsFunctions";
import Image from "next/image";
import React, { useRef, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuActions from "../MenuActions/MenuActions";
import CustomPopup from "../CustomPopup";
import CreateNotes from "@/src/modules/CreateNotes";
import { useLazyDeleteNoteQuery } from "@/services/journalApi";
import {
  notificationError,
  notificationLoadProcess,
  notificationSuccess,
} from "@/src/utils/notifyFunctions";
import { useDispatch } from "react-redux";
import { setRefresh } from "@/slices/refreshSlice";
// import { refreshNoteState } from "@/slices/noteSlice";

type Props = {
  notes: DataNotes[];
};

const NoteList = ({ notes }: Props) => {
  const createNote = useRef();
  const [selectNote, setSelectNote] = useState<string | undefined>("");

  const [deleteNote, { isLoading }] = useLazyDeleteNoteQuery();
  const dispatch = useDispatch();

  const toggleCreateNote = () => {
    (createNote.current as any).toggle();
  };

  const handleDeleteNote = async (id: string) => {
    const response = await deleteNote(id);

    if (isLoading) {
      notificationLoadProcess({
        title: "Eliminando nota",
        content: "Por favor espere un momento",
      });
    }

    if (response.data) {
      notificationSuccess({
        title: "Nota eliminada",
        content: "La nota fue eliminada correctamente",
      });
      dispatch(setRefresh(true));
    } else {
      notificationError({
        title: "Error al eliminar",
        content: "Hubo un error al eliminar la nota",
      });
    }
  };

  return (
    <div className="w-full h-auto grid grid-cols-4 grid-rows-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {notes?.map((note) => {
        const dateFormated = note.date ? new Date(note.date) : null;
        const convertDate = formatTime(dateFormated as Date);

        let tittleTrimmed = note.title?.substring(0, 21);
        if (note.title.length > 21) {
          tittleTrimmed += "...";
        }

        const optionsListData = [
          {
            id: 1,
            name: "Editar nota",
            icon: <EditNoteIcon />,
            handlerOption: () => {
              toggleCreateNote();
              setSelectNote(note.id);
            },
          },
          {
            id: 2,
            name: "Eliminar nota",
            icon: <DeleteForeverIcon />,
            handlerOption: () => handleDeleteNote(note.id as string),
          },
        ];
        return (
          <div
            key={note.id}
            className="w-full max-w-56 h-56 rounded-lg shadow-custom-tooltip px-4 pt-4 pb-3 flex flex-col gap-4 items-center justify-center dark:shadow-custom-tooltip-dark "
          >
            <Image
              src={note.img ? note.img : "/icons/iconNotes.svg"}
              alt="search"
              width={152}
              height={152}
              className="xl"
              priority
            />
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-xs font-medium dark:text-white">{tittleTrimmed}</p>
                <p className="text-[10px] font-medium dark:text-white">{convertDate}</p>
              </div>
              <MenuActions options={optionsListData} />
            </div>
          </div>
        );
      })}

      <CustomPopup customRef={createNote} closeOnEscape={false}>
        <CreateNotes onClose={toggleCreateNote} idNote={selectNote} />
      </CustomPopup>
    </div>
  );
};

export default NoteList;
