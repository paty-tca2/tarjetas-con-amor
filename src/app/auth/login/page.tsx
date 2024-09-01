"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthRepositoryImpl } from "@/core/repositories/AuthRepository";
import { Either, fold } from "fp-ts/Either";
import {LoginUser} from "@/core/usecases/auth/LoginUseCase";
import { useRouter } from 'next/navigation';

// Inicializa el repositorio y el caso de uso
const authRepository = new AuthRepositoryImpl();
const loginUserUseCase = new LoginUser(authRepository);

export default function SignIn() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result: Either<string, any> = await loginUserUseCase.execute(userData);

        fold(
            (error: string) => {
                toast.error(error);
            },
            (success: any) => {
                toast.success("Inicio de sesión exitoso");
                router.push('/my-account');
            }
        )(result);
    };

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

            <div className="relative z-10 flex flex-col items-start justify-center p-6 py-48 min-h-screen">
                <div className="pb-4">
                    <div className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-40 pb-6">
                        <div className="text-left">
                            <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                                <span style={{ color: "#ffffff" }}>¿No tienes </span>
                                <span style={{ color: "#04d7af" }}>cuenta?</span>
                            </h1>
                        </div>
                        <Link href="/auth/sign-up">
                            <button className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white px-5 py-2 text-[1rem] sm:text-[1.1rem]">
                                REGISTRATE
                            </button>
                        </Link>
                    </div>
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                        <span style={{ color: "#ffffff" }}>INGRESA</span>
                    </h1>
                </div>

                <div className="w-full pl-16 max-w-md">
                    <form className="flex flex-col mt-4 items-end justify-end space-y-4" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="email">
                                CORREO ELECTRONICO
                            </label>
                            <input
                                className="w-full p-1 text-black"
                                type="email"
                                id="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="password">
                                CONTRASEÑA
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full p-1 text-black placeholder:text-xs"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-500" />
                                    ) : (
                                        <FaEye className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="w-full text-left">
                            <a href="/privacy" className="text-xs font-geometos text-[#04d7af] underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <div className="w-full">
                            <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full py-2 text-[1rem]">
                                ENTRAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}