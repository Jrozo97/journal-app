import { DataNotes } from "@/interface/Notes";
import { ResponseDataNote } from "@/interface/components.interface";
import {
  useCreateNoteMutation,
  useLazyGetNoteByIdQuery,
  useLazyGetNotesListQuery,
  useUpdateNoteMutation,
} from "@/services/journalApi";
import { setRefresh } from "@/slices/refreshSlice";
// import { refreshNoteState } from "@/slices/noteSlice";
import { selectUser } from "@/slices/userSlice";
import CustomButton from "@/src/components/CustomButton/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import FileUploader from "@/src/components/FileUploader";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHook";
import {
  notificationError,
  notificationSuccess,
} from "@/src/utils/notifyFunctions";
import React, { ChangeEvent, useEffect, useState } from "react";

const CreateNotes = ({
  onClose,
  idNote,
}: {
  onClose: () => void;
  idNote?: string;
}) => {
  const user = useAppSelector(selectUser);
  const [inputs, setInputs] = useState<any>({
    title: "",
    content: "",
  });
  const [imageDisplay, setImageDisplay] = useState<string | undefined>("");
  const [pdfBuffer, setPdfBuffer] = useState<string | ArrayBuffer | null>(null);
  const dispatch = useAppDispatch();
  const [createNote, { isLoading: isLoadingCreate }] = useCreateNoteMutation();
  const [updateNote, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation();
  const [getNoteById, { isLoading: isLoadingSearch }] =
    useLazyGetNoteByIdQuery();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({
      ...values,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (idNote) {
      getNoteById({ id: idNote })
        .then((res) => {
          const resData = res.data as ResponseDataNote;
          setInputs({
            title: resData.note.title,
            content: resData.note.content,
          });
          setImageDisplay(resData.note.img);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getNoteById, idNote]);

  const handleSubmit = async () => {
    const noteData = {
      title: inputs.title,
      content: inputs.content,
      image: pdfBuffer,
      userId: user.uid,
    };

    if (idNote) {
      if (inputs.file) {
        const updateDataNote = { id: idNote, ...noteData };
        const response = (await updateNote(
          updateDataNote
        ).unwrap()) as ResponseDataNote;
        if (response.ok) {
          notificationSuccess({
            title: "Nota actualizada",
            content: "Tu nota ha sido actualizada exitosamente",
          });
          dispatch(setRefresh(true));
          onClose();
        } else {
          notificationError({
            title: "Error",
            content: "No se pudo actualizar la nota",
          });
        }
      } else {
        const updateDataNote = {
          id: idNote,
          title: inputs.title,
          content: inputs.content,
          userId: user.uid,
        };
        const response = (await updateNote(
          updateDataNote
        ).unwrap()) as ResponseDataNote;
        if (response.ok) {
          notificationSuccess({
            title: "Nota actualizada",
            content: "Tu nota ha sido actualizada exitosamente",
          });

          dispatch(setRefresh(true));
          onClose();
        } else {
          notificationError({
            title: "Error",
            content: "No se pudo actualizar la nota",
          });
        }
      }
    } else {
      const response = (await createNote(
        noteData
      ).unwrap()) as ResponseDataNote;
      if (response.ok) {
        notificationSuccess({
          title: "Nota creada",
          content: "Tu nota ha sido creada exitosamente",
        });
        dispatch(setRefresh(true));
        onClose();
      } else {
        notificationError({
          title: "Error",
          content: "No se pudo actualizar la nota",
        });
      }
    }
  };

  useEffect(() => {
    pdfConvertBase64(inputs.file);
  }, [inputs.file]);

  const isDisabled = inputs.title === "" || inputs.content === "";

  function pdfConvertBase64(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPdfBuffer(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setPdfBuffer(null);
    }
  }

  return (
    <section className="pt-16 px-28 pb-10 bg-white rounded-2xl flex flex-col items-center w-[680px] h-auto dark:bg-dark-primary ">
      <h1 className="font-bold text-3xl text-primary dark:text-white">
        {idNote ? "Actualizar nota" : "Creación de nota"}
      </h1>
      <main className="w-full flex flex-col mt-10 gap-6">
        <CustomInput
          label="Escribe un título"
          placeholder="Escribe un titulo increible"
          name="title"
          value={inputs.title}
          // defaultValue={inputs.title}
          onChange={handleChange}
          className="w-full h-12 border-b border-gray-300 px-4 outline-none rounded-lg dark:border-dark-gray dark:focus:border-white/60 dark:bg-dark-primary dark:text-white dark:placeholder-light-gray dark:placeholder-opacity-60"
          type="text"
        />
        <CustomInput
          label="Descripción"
          placeholder="¿Que estas pasando hoy?"
          name="content"
          value={inputs.content}
          // defaultValue={inputs.content}
          onChangeTextArea={handleChange}
          className="w-full h-48 border border-gray-300 rounded-lg px-4 py-2 notebook-textarea dark:border-dark-gray dark:focus:border-white/60 dark:bg-dark-primary dark:text-white dark:placeholder-light-gray dark:placeholder-opacity-60"
          type="textarea"
        />
        <FileUploader
          label="Subir archivo"
          name="file"
          value={inputs.file}
          setInputs={setInputs}
          acceptedFiles={{
            type: "image/*",
            extensions: [".jpg", ".png", ".gif", ".webp"],
          }}
          titleAcceptFile="Solo se permiten archivos .png"
          width="120px"
          height="120px"
          imageDisplay={imageDisplay}
        />
      </main>
      <footer className="flex flex-row w-full justify-between mt-11">
        <CustomButton
          label="Cancelar"
          onClick={onClose}
          className="w-36 h-12 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-primary dark:hover:text-white dark:hover:border-none"
        />
        <CustomButton
          label={idNote ? "Actualizar" : "Crear"}
          onClick={handleSubmit}
          loading={isLoadingCreate || isLoadingUpdate}
          className="w-36 h-12 bg-primary text-white rounded-lg disabled:bg-dark-gray disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={isLoadingCreate || isLoadingUpdate || isDisabled}
        />
      </footer>
    </section>
  );
};

export default CreateNotes;
