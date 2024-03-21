import CustomButton from "@/src/components/CustomButton/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/src/hooks/reduxHook";
import { setUserState } from "@/slices/userSlice";
import User from "@/interface/User";

const Login = () => {
  const [inputs, setInputs] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [error, setError] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const distpatch = useAppDispatch();

  const isDisabled = !inputs.email || !inputs.password;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (session && router.pathname === "/login") {
      router.replace("/notes");
    }
  }, [session, router]);

  const handleSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (inputs.email && inputs.password) {
      const result = await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
      });

      if (result && result.error) {
        setError(true);
      } else {
        const userSession = await getSession();
        if (userSession) {
          setError(false);
          router.push("/notes");
          distpatch(setUserState(userSession.user as User));
        }
      }
    } else {
      setError(true);
    }
  };

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
            className="w-80 h-9 border border-black pl-2 rounded-md di"
            placeholder="Contraseña"
            label="Contraseña"
            name="password"
            onChange={handleChange}
          />
        </div>
        <CustomButton
          label="Iniciar sesion"
          classNameButton="w-32 py-2 bg-green rounded-md text-white mt-8 mb-40 disabled:bg-gray disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isDisabled || error}
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
