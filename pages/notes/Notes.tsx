import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useAppSelector } from "@/src/hooks/reduxHook";
import { selectUser } from "@/slices/userSlice";
import HeaderPage from "@/src/components/HeaderMenu/HeaderPage";
import { useLazyGetNotesListQuery } from "@/services/journalApi";
import { ListNotes, Notes } from "@/interface/Notes";

const Notes = () => {
  const handleLogout = async () => {
    await signOut();
  };

  const user = useAppSelector(selectUser);
  console.log(user);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState<Notes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [getNotesList, { isLoading: isLoadingNotes }] = useLazyGetNotesListQuery();

  React.useEffect(() => {
    setIsLoading(true);
    getNotesList({
      page,
      search,
      limit,
    })
      .then((res) => {
        const resDataNote = res.data as { notes: ListNotes };
        const resJson = res.data // Type assertion to specify the type of resData
        console.log("resData", resDataNote);
        setNotes(resDataNote.notes as Notes[]);

      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [getNotesList, limit, page, search]);

  console.log("notes", notes)

  return (
    <>
      <HeaderPage titleHeader="Notas Rapidas" />
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </>
  );
};

export default Notes;
