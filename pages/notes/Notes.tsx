import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useAppSelector } from "@/src/hooks/reduxHook";
import { selectUser } from "@/slices/userSlice";

import { useLazyGetNotesListQuery } from "@/services/journalApi";
import { ListNotes, DataNotes } from "@/interface/Notes";
import HeaderPage from "@/src/components/HeaderPage";
import ListDataSearch from "@/src/components/ListDataSearch/ListDataSearch";
import { useRefreshToken } from "@/src/hooks/useRefreshToken";
import { checkTokenExpiration } from "@/src/utils/utilsFunctions";

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
  const [notes, setNotes] = useState<DataNotes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [getNotesList, { isLoading: isLoadingNotes }] =
    useLazyGetNotesListQuery();

  const refreshToken = useRefreshToken();

  // useEffect(() => {
  //   const tokenRemainingTime = checkTokenExpiration(user.token);
  //   if (tokenRemainingTime <= 2) {
  //     refreshToken();
  //   }
  // }, [refreshToken, user.token]);

  useEffect(() => {
    setIsLoading(true);
    getNotesList({
      page,
      search,
      limit,
    })
      .then((res) => {
        const resDataNote = res.data as ListNotes;
        const resJson = res.data; // Type assertion to specify the type of resData
        console.log("resData", resDataNote);
        setNotes(resDataNote.notes as DataNotes[]);
        setTotalPage(resDataNote?.totalPage as number);
        setTotalRecords(resDataNote?.totalRecords as number);
        setError(resDataNote?.error as boolean);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getNotesList, limit, page, search]);

  console.log("notes", notes);

  return (
    <>
      <HeaderPage titleHeader="Notas Rapidas" />
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <ListDataSearch
        setPage={setPage}
        page={page}
        setSearch={setSearch}
        totalPage={totalPage}
        error={error}
        isLoading={isLoading || isLoadingNotes}
        notes={notes}
      />
    </>
  );
};

export default Notes;
