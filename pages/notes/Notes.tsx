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
import { RTKUseCache } from "@/src/utils/utilsText";
import { selectNote } from "@/slices/noteSlice";
import { selectRefresh } from "@/slices/refreshSlice";

const Notes = () => {
  const handleLogout = async () => {
    await signOut();
  };

  // const refreshNote = useAppSelector(selectNote);
  const refresh =useAppSelector(selectRefresh);
  console.log("refresh", refresh.refresh)

  const user = useAppSelector(selectUser);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [notes, setNotes] = useState<DataNotes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshingToken, setIsRefreshingToken] = useState<boolean>(false);

  const [getNotesList, { isLoading: isLoadingNotes }] =
    useLazyGetNotesListQuery();

  const refreshToken = useRefreshToken(setIsRefreshingToken);

  useEffect(() => {
    const tokenRemainingTime = checkTokenExpiration(user.token);
    if (tokenRemainingTime <= 2 && !isRefreshingToken) {
      setIsRefreshingToken(true);
      refreshToken();
    }
  }, [user.token, isRefreshingToken, refreshToken]);

  const fetchNoteList = async (useCache: boolean) => {
    setIsLoading(true);
    getNotesList(
      {
        page,
        search,
        limit,
      },
      useCache
    )
      .then((res) => {
        const resDataNote = res.data as ListNotes;
        setNotes(resDataNote.notes as DataNotes[]);
        setTotalPage(resDataNote?.totalPage as number);
        setTotalRecords(resDataNote?.totalRecords as number);
        setError(resDataNote?.error as boolean);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const useCache = refresh.refresh ? false : RTKUseCache;
    fetchNoteList(useCache);

  }, [page, search, limit, refresh.refresh]);

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
