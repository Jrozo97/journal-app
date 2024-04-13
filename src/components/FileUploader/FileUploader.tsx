import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Container, FileContainer } from "./FileUploader.style";

interface AcceptedFiles {
  extensions: string[];
  type: string;
}

interface FileUploaderProps {
  setInputs: React.Dispatch<React.SetStateAction<{}>>;
  acceptedFiles: AcceptedFiles
  name: string;
  value: File | File[] | null;
  width?: string;
  label?: string;
  titleAcceptFile?: string;
  height?: string;
}

const FileUploader = ({
  setInputs,
  acceptedFiles,
  name,
  value,
  width = "100%",
  label,
  titleAcceptFile,
  height,
}: FileUploaderProps) => {
  const [correctTypeFile, setCorrectTypeFile] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptFiles: File[], rejectedFiles: FileRejection[]) => {
      setInputs((values) => ({
        ...values,
        file: acceptFiles[0],
      }));

      const file = acceptFiles[0];
      const isImageFile = file.type.includes("image/");
      if (isImageFile) {
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setPreviewImage(null);
      }

      setCorrectTypeFile(rejectedFiles.length === 0);
    },
    [setInputs]
  );

  const dropzoneProps = useDropzone({
    onDrop,
    accept: {
      [acceptedFiles.type]: acceptedFiles.extensions,
    },

  });

  const { getRootProps, getInputProps } = dropzoneProps;

  const resetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputs((values) => ({ ...values, [name]: "" }));
  };

  return (
    <div className="flex flex-row">
      <Container width={width}>
        {label && <p className="text-sm font-medium pb-2">{label}</p>}
        <FileContainer
          {...getRootProps({
            value,
            width,
            acceptedFiles,
            height,
          })}
        >
          {value && correctTypeFile ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-center">
                <Image
                  src={previewImage || "/icons/iconNotes.svg"}
                  alt="iconFile"
                  width={110}
                  height={110}
                  className="object-cover"
                />
              </div>
            </div>
          ) : !correctTypeFile ? (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#4F4F4F] leading-[1rem] text-center">
                Documento inválido. Adjunta un archivo original
              </p>
              <div className="flex flex-row cursor-pointer">
                <p className="font-mont text-xs font-medium text-qenta-color">
                  Reemplazar archivo
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row w-full justify-between cursor-pointer">
              <p className="text-xs text-[#888888] leading-[1rem] font-medium text-center max-w-[180px]">
                Arrastra o haz clic aquí para adjuntar un archivo.
              </p>
            </div>
          )}
        </FileContainer>
      </Container>
      {value && correctTypeFile && acceptedFiles && (
        <button
          className="ml-3 self-end flex gap-2 items-center"
          onClick={resetClick}
        >
          <Image
            src="/icons/iconDelete.svg"
            alt="iconDelete"
            width={20}
            height={20}
          />
          <p className="text-xs text-error underline">Eliminar archivo</p>
        </button>
      )}
    </div>
  );
};

export default FileUploader;
