import CustomButton from "@/src/components/CustomButton/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({}); // Declare the state variable and its setter function

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  console.log("inputs", inputs);

  return (
    <div className="bg-gradient-to-r from-green via-green-g to-primary from-0% via-55% to-100%  w-screen h-screen flex justify-center items-center">
      <div className="px-20 py-9 bg-white rounded-2xl flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="icons/logo-journal.svg"
            width={60}
            height={60}
            alt="logo"
          />
          <h1 className="text-2xl font-semibold italic text-center">
            JournalApp
          </h1>
          <p className="text-sm italic text-center text-green-g">
            Nunca lo olvides
          </p>
        </div>
        <p className="text-2xl font-semibold mt-10">Inicia sesion</p>

        <div className="flex flex-col gap-5 mt-10">
          <CustomInput
            type="email"
            className="w-80 h-9 border border-black pl-2 rounded-md"
            placeholder="Correo electronico"
            label="Correo electronico"
            name="email"
            onChange={handleChange}
          />
          <CustomInput
            type="password"
            className="w-80 h-9 border border-black pl-2 rounded-md "
            placeholder="Contraseña"
            label="Contraseña"
            name="password"
            onChange={handleChange}
          />
        </div>
        <CustomButton
          label="Iniciar sesion"
          classNameButton="w-32 py-2 bg-green rounded-md text-white mt-8 mb-40"
        />
        <p className="text-sm font-normal ">
          ¿No tiene una cuenta?{" "}
          <span className="font-medium text-primary underline">
            Crear una cuenta
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
