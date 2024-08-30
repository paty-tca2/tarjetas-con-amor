// pages/index.js
"use client"
import Image from 'next/image';
import Link from 'next/link';

import React, { useState } from "react";


export default function SignUp() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(event.target.checked);
    };


    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center py-16">

            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black bg-opacity-65">
                <div className="absolute inset-0 w-full h-full mix-blend-overlay">
                    <Image
                        src="/fondo_singup.jpeg"
                        alt="Descripción de la imagen"
                        layout="fill"
                        objectFit="cover"
                        className={`w-full`}
                    />
                </div>
            </div>

            {/* Contenedor principal */}
            <div className="relative z-10 flex flex-col items-start justify-center p-6 min-h-screen">

                {/* Texto encima del formulario */}
                <div className="pb-4">
                    <div
                        className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-20 pb-6">
                        <div className="text-left">
                            <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                                <span style={{color: "#ffffff"}}>¿Tienes </span>
                                <span style={{color: "#04d7af"}}>cuenta?</span>
                            </h1>
                        </div>
                        <Link href="/auth/login">
                        <button
                            className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-[7rem] h-10 text-[1rem] sm:text-[1.25rem]">INGRESA
                        </button>
                        </Link>
                    </div>
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                        <span style={{color: "#ffffff"}}>¿No tienes? </span>
                        <span style={{color: "#04d7af"}}>Regístrate ahora</span>
                    </h1>
                </div>

                {/* Contenedor para las secciones de formulario e información */}
                <div className="relative z-10 flex flex-col md:flex-row justify-center">

                    {/* Sección del formulario */}
                    <div className="border border-white w-full px-6 py-8 max-w-lg">
                        <h2 className="text-2xl dark:text-white font-geometos">Empieza a crear memorias</h2>

                        <form className="grid grid-rows-1 sm:grid-cols-2 gap-2 mt-4  items-center">
                            <div>
                                <label className="block text-white text-[0.78rem] font-geometos pb-1"
                                       htmlFor="name">NOMBRE</label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className="block text-white text-[0.78rem] font-geometos pb-1"
                                       htmlFor="apellido">APELLIDO</label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="text"
                                    id="apellido"
                                />
                            </div>
                            <div className="pt-2">
                                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="email">INTRODUCE
                                    TU
                                    CORREO</label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="email"
                                    id="email"
                                />
                            </div>
                            <div className="pt-2">
                                <label className="block text-white text-[0.78rem] font-geometos pb-1"
                                       htmlFor="confirmEmail">CONFIRMA
                                    TU CORREO</label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="email"
                                    id="confirmEmail"
                                />
                            </div>
                            <div className="pt-2">
                                <label className="block text-white text-[0.78rem] font-geometos pb-1"
                                       htmlFor="password">CONTRASEÑA</label>
                                <input
                                    className="w-full p-1 text-black placeholder:text-xs"
                                    type="password"
                                    id="password"
                                    placeholder='Una mayuscula, un numero y un caracter especial'
                                />
                            </div>
                            <div className="pt-2">
                                <label className="block text-white text-[0.78rem] font-geometos pb-1"
                                       htmlFor="confirmPassword">CONFIRMA
                                    TU CONTRASEÑA</label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="password"
                                    id="confirmPassword"
                                />
                            </div>
                            {/* Checkbox para aceptar términos y condiciones */}
                            <div className="col-span-2 flex items-center mt-4 text-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label htmlFor="terms" className="text-white text-xs font-geometos">
                                    Acepto los <a href="/terms" className="text-[#04d7af] underline">términos y
                                    condiciones</a>
                                </label>
                            </div>

                            <div className="col-span-2 my-3">
                                <button
                                    className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full h-10">CREAR
                                    CUENTA
                                </button>
                            </div>

                            <div className="col-span-2 text-center">
                                <a href="/privacy" className="text-xs font-geometos text-[#04d7af] underline">
                                    Aviso de privacidad
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* Sección del contenedor de información */}
                    <div className="border border-white w-full max-w-lg bg-white px-6 py-2 ">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/logo-principal.png"
                                alt="Descripción de la imagen"
                                width={150}
                                height={150}
                                layout="intrinsic"
                            />
                        </div>
                        <h2 className="text-lg font-bold mb-2 text-[#5d60a6] font-geometos text-center">Beneficios</h2>
                        <div className="flex flex-col text-[#5d60a6] space-y-4 text-[0.88rem] font-geometos">
                            <div className="normal-case">
                                <p className="pb-3">1) Recordatorios:</p>
                                <p>Nunca vuelvas a olvidar una ocasión especial.</p>
                            </div>
                            <div>
                                <p className="pb-3">2) Ahorra tiempo y dinero:</p>
                                <p>Direcciones y métodos de pago seleccionados.</p>
                            </div>
                            <div>
                                <p className="pb-3">3) Promociones:</p>
                                <p>Obtén potenciales descuentos de temporada y por cliente frecuente.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
