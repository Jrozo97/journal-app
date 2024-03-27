import { jwtDecode } from "jwt-decode";


export const formatTime = (date: Date): string => {
  return date
    .toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/");
};


export const checkTokenExpiration = (token: string) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const expirationTime = decoded.exp as number;
    const remainingTime = expirationTime - currentTime;

    return remainingTime / 60;
};