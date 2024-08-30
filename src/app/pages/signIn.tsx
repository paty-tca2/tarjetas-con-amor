"use client";
import Image from "next/image";
import React from "react";

export default function SignIn() {
    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center">
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black bg-opacity-65">
                <div className="absolute inset-0 w-full h-full mix-blend-overlay">
                    <Image
                        src="/fondo_singup.jpeg"
                        alt="Descripción de la imagen"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-start justify-center p-6 min-h-screen">

                <div className="pb-4">
                    <div className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-40 pb-6">
                        <div className="text-left">
                            <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                                <span style={{color: "#ffffff"}}>¿No tienes </span>
                                <span style={{color: "#04d7af"}}>cuenta?</span>
                            </h1>
                        </div>
                        <button
                            className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white px-5 py-2 text-[1rem] sm:text-[1.1rem]">
                            REGÍSTRATE
                        </button>
                    </div>
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                        <span style={{color: "#ffffff"}}>INGRESA</span>
                    </h1>
                </div>

                <div className="w-full pl-16 max-w-md justify-center">
                    <form className="flex flex-col mt-4 items-end justify-end space-y-4">
                        <div className="w-full">
                            <input
                                className="w-full p-3 text-black rounded-sm text-sm"
                                type="text"
                                id="email"
                                placeholder="CORREO ELÉCTRONICO"
                            />
                        </div>
                        <div className="w-full">
                            <input
                                className="w-full p-3 text-black rounded-sm text-sm"
                                type="password"
                                id="password"
                                placeholder="CONTRASEÑA"
                            />
                        </div>

                        <div className="w-full text-left">
                            <a href="/privacy" className="text-xs font-geometos text-[#04d7af] underline">
                                FORGOT YOUR PASSWORD?
                            </a>
                        </div>

                        <div className="w-full">
                            <button
                                className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full py-2 text-[1rem]"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
