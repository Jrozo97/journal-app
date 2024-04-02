import React, { useState } from "react";

const CreateNotes = ({ onClose }: { onClose: () => void }) => {

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  return (
    <div className="pt-16 px-28 pb-10 bg-white rounded-2xl flex flex-col items-center w-[680px] h-[735px] ">
      <p className="font-bold text-3xl text-primary">Creación de nota</p>
      <div className="w-full flex flex-col mt-10 gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm">Escribe un título</p>
          <input
            type="text"
            placeholder="Escribe un titulo increible"
            className="w-full h-12 border-b border-gray-300  px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm mb-2">Descripción</p>

          <textarea
            placeholder="¿Que estas pasando hoy?"
            className="w-full h-48 border border-gray-300 rounded-lg px-4 py-2 notebook-textarea"
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between mt-11">
        <button
          className="w-36 h-12 bg-primary text-white rounded-lg"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button className="w-36 h-12 bg-primary text-white rounded-lg">
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateNotes;
