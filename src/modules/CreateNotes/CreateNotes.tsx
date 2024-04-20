import { useCreateNoteMutation } from "@/services/journalApi";
import { selectUser } from "@/slices/userSlice";
import CustomButton from "@/src/components/CustomButton/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import FileUploader from "@/src/components/FileUploader";
import { useAppSelector } from "@/src/hooks/reduxHook";
import { notificationSuccess } from "@/src/utils/notifyFunctions";
import React, { ChangeEvent, useEffect, useState } from "react";

 

const CreateNotes = ({ onClose, id }: { onClose: () => void; id?: string; }) => {

  console.log("id", id);

  const user = useAppSelector(selectUser);
  const [inputs, setInputs] = useState<any>({
    title: "",
    content: "",
  });
  const [pdfBuffer, setPdfBuffer] = useState<string | ArrayBuffer | null>(null);

  const [createNote, { isLoading: isLoadingCreate }] = useCreateNoteMutation();

  console.log("inputs", inputs);

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

  console.log("user", user);

  const handleSubmit = async () => {
    // const dataImage = JSON.stringify(pdfBuffer);
    // const noteData = {
    //   title: inputs.title,
    //   content: inputs.content,
    //   image: pdfBuffer,
    //   userId: user.uid,
    // };

    // console.log("create", noteData);

    // const response = await createNote(noteData).unwrap();
    // console.log("response", response);

    notificationSuccess({
      title: "Nota creada",
      content: "Tu nota ha sido creada exitosamente",
    });
  };

  console.log("inputs file", inputs.file);

  useEffect(() => {
    pdfConvertBase64(inputs.file);
  }, [inputs.file]);

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
    <section className="pt-16 px-28 pb-10 bg-white rounded-2xl flex flex-col items-center w-[680px] h-auto ">
      <h1 className="font-bold text-3xl text-primary">Creación de nota</h1>
      <main className="w-full flex flex-col mt-10 gap-6">
        <div className="flex flex-col gap-2">
          <CustomInput
            label="Escribe un título"
            placeholder="Escribe un titulo increible"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="w-full h-12 border-b border-gray-300 px-4 outline-none rounded-lg"
            type="text"
          />
          {/* <label className="font-medium text-sm">Escribe un título</label>
          <input
            type="text"
            placeholder="Escribe un titulo increible"
            className="w-full h-12 border-b border-gray-300 px-4 outline-none rounded-lg"
            name="title"
            onChange={handleChange}
            value={inputs.title}
          /> */}
        </div>
        <div className="flex flex-col gap-2">
          {/* <label className="font-medium text-sm mb-2">Descripción</label>

          <textarea
            placeholder="¿Que estas pasando hoy?"
            className="w-full h-48 border border-gray-300 rounded-lg px-4 py-2 notebook-textarea"
            name="content"
            onChange={handleChange}
            value={inputs.content}
          /> */}
          <CustomInput
            label="Descripción"
            placeholder="¿Que estas pasando hoy?"
            name="content"
            value={inputs.content}
            onChangeTextArea={handleChange}
            className="w-full h-48 border border-gray-300 rounded-lg px-4 py-2 notebook-textarea"
            type="textarea"
          />
        </div>

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
        />
      </main>
      <footer className="flex flex-row w-full justify-between mt-11">
        <CustomButton
          label="Cancelar"
          onClick={onClose}
          className="w-36 h-12 bg-primary text-white rounded-lg"
        />
        <CustomButton
          label="Crear"
          onClick={handleSubmit}
          loading={isLoadingCreate}
          className="w-36 h-12 bg-primary text-white rounded-lg"
        />
      </footer>
    </section>
  );
};

export default CreateNotes;
