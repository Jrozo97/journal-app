import RegisterUser from "@/interface/RegisterUser";
import User from "@/interface/User";
import { useUserRegisterMutation } from "@/services/userApi";
import { setUserState } from "@/slices/userSlice";
import CustomButton from "@/src/components/CustomButton/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import { useAppDispatch } from "@/src/hooks/reduxHook";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState<RegisterUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();
  const isDisabled = !inputs.email || !inputs.password;
  const distpatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [userRegister, { isLoading: isLoadingUser }] =
    useUserRegisterMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await userRegister(inputs);
    const { data }: any = response;

    if (data) {
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
          setIsLoading(false);
          setError(false);
          router.push("/notes");
          distpatch(setUserState(userSession.user as User));
        }
      }
    } else {
      setError(true);
    }
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="dark:bg-dark-bg bg-secondary w-screen h-screen flex justify-center items-center dark:bg-dark-secondary">
      <div className="px-20 py-9 bg-white dark:bg-dark-primary rounded-2xl flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="icons/logo-journal.svg"
            width={60}
            height={60}
            alt="logo"
          />
          <h1 className="text-2xl font-semibold italic text-center dark:text-white">
            JournalApp
          </h1>
          <p className="text-sm italic text-center text-green-g dark:font-semibold">
            Nunca lo olvides
          </p>
        </div>
        <p className="text-2xl font-semibold mt-10 dark:text-white">
          Registrate
        </p>

        <div className="flex flex-col gap-5 mt-10">
          <CustomInput
            type="text"
            className="w-80 h-9 border border-black pl-2 rounded-md dark:bg-dark-primary dark:text-white dark:border-dark-gray dark:focus:border-white/60"
            placeholder="Ingrese su nombre"
            label="Nombre completo"
            name="name"
            onChange={handleChange}
          />
          <CustomInput
            type="email"
            className="w-80 h-9 border border-black pl-2 rounded-md dark:bg-dark-primary dark:text-white dark:border-dark-gray dark:focus:border-white/60"
            placeholder="Correo electronico"
            label="Correo electronico"
            name="email"
            onChange={handleChange}
          />
          <CustomInput
            type="tel"
            className="w-80 h-9 border border-black pl-2 rounded-md dark:bg-dark-primary dark:text-white dark:border-dark-gray dark:focus:border-white/60"
            placeholder="Ingrese su telefono"
            label="Telefono"
            name="phone"
            onChange={handleChange}
          />
          <CustomInput
            type="password"
            className="w-80 h-9 border border-black pl-2 rounded-md dark:bg-dark-primary dark:text-white dark:border-dark-gray dark:focus:border-white/60 "
            placeholder="Ingrese la contraseña"
            label="Contraseña"
            name="password"
            onChange={handleChange}
          />
        </div>
        <CustomButton
          label="Registrarse"
          className="w-32 py-2 bg-green rounded-md text-white my-8 disabled:bg-gray disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isDisabled || error}
          loading={isLoadingUser}
        />
        <p className="text-sm font-normal dark:text-white">
          ¿Ya tiene una cuenta?{" "}
          <span
            className="font-medium text-primary underline cursor-pointer dark:text-secondary dark:font-semibold"
            onClick={redirectToLogin}
          >
            Iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
