import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import logo from "../assets/th.png";
import bg from "../assets/haikei-bg.svg";

type Props = {};

function Login({}: Props) {
  return (
    <div className="">
      <div
        className="h-screen bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
          <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
            <div className="self-start hidden lg:flex flex-row  text-gray-800">
              <h1 className="my-3 font-semibold text-2xl">Bienvenido a</h1>
              <div className="flex items-center justify-start pl-2">
                <h1 className="font-black text-3xl">Tracker</h1>
                <img
                  src={logo}
                  className="h-12 w-auto relative top-[-5px]"
                  alt="TH logo"
                />
              </div>
            </div>
            <p className="pr-3 text-sm opacity-75 text-gray-800">
              Inicie sesión para poder utilizar todas las funcionalidades
              disponibles
            </p>
          </div>
          <div className="flex justify-center self-center  z-10 shadow-xl">
            <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
              <div className="mb-7">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Iniciar Sesión
                </h3>
                <Typography color="red" variant="caption"></Typography>
              </div>

              <div className="space-y-6">
                <Box component="form">
                  <input
                    className=" w-full text-sm  px-4 py-3 mb-4 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                    type="email"
                    placeholder="Correo Electrónico"
                    name="correo"
                    autoComplete="username"
                  />

                  <input
                    className=" w-full text-sm  px-4 py-3 mb-4 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    autoComplete="current-password"
                  />

                  <button
                    type="submit"
                    className="w-full flex justify-center bg-cyan-800  hover:bg-blue-pucp text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>

                  <div className="flex items-center justify-center space-x-2 my-5">
                    <span className="h-px w-16 bg-gray-100"></span>
                    <span className="text-gray-300 font-normal">or</span>
                    <span className="h-px w-16 bg-gray-100"></span>
                  </div>
                  <div className="flex justify-center gap-5 w-full ">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:bg-blue-gray-100 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                    >
                      <svg
                        className="w-4 mr-2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#EA4335"
                          d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                        />
                      </svg>
                      <span>Google</span>
                    </button>
                  </div>
                </Box>
                <div className="mt-7 text-center text-cyan-800 text-xs">
                  <span>Copyright TrackerHub © 2023-2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
          <div className="container p-5 mx-auto  flex items-center justify-between ">
            <div className="flex mr-auto"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
