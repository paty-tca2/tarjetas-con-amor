// pages/index.js
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RegisterUser } from "@/core/usecases/auth/RegisterUsecase";
import { AuthRepositoryImpl } from "@/core/repositories/AuthRepository";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Either, fold } from "fp-ts/Either";
import ClipLoader from "react-spinners/ClipLoader";

const authRepository = new AuthRepositoryImpl();
const registerUserUseCase = new RegisterUser(authRepository);

export default function SignUp() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked(event.target.checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userData.email !== confirmEmail) {
            toast.error("Los correos electrónicos no coinciden", {
                position: "top-center",
            });
            return;
        }

        if (userData.password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden", {
                position: "top-center",
            });
            return;
        }

        setLoading(true);

        const result: Either<string, any> = await registerUserUseCase.execute(
            userData
        );

        fold(
            (error: string) => {
                toast.error(error, {
                    position: "top-center",
                });
            },
            (success: any) => {
                toast.success("Usuario registrado con éxito", {
                    position: "top-center",
                });
            }
        )(result);

        setLoading(false);
    };

    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center py-48">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <ClipLoader color="#04d9b2" loading={loading} size={50} />
                </div>
            )}

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

            <div className="relative z-10 flex flex-col items-start justify-center p-6 min-h-screen">
                <div className="pb-4">
                    <div className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-20 pb-6">
                        <div className="text-left">
                            <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                                <span style={{ color: "#ffffff" }}>¿Tienes </span>
                                <span style={{ color: "#04d7af" }}>cuenta?</span>
                            </h1>
                        </div>
                        <Link href="/auth/login">
                            <button
                                className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-[7rem] h-10 text-[1rem] sm:text-[1.25rem]">INGRESA
                            </button>
                        </Link>
                    </div>
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                        <span style={{ color: "#ffffff" }}>¿No tienes? </span>
                        <span style={{ color: "#04d7af" }}>Regístrate ahora</span>
                    </h1>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-center">
                    <div className="border border-white w-full px-6 py-8 max-w-lg">
                        <h2 className="text-2xl dark:text-white font-geometos">
                            Empieza a crear memorias
                        </h2>

                        <form
                            className="grid grid-rows-1 sm:grid-cols-2 gap-2 mt-4 items-center"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="first_name"
                                >
                                    NOMBRE
                                </label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="text"
                                    id="first_name"
                                    value={userData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="last_name"
                                >
                                    APELLIDO
                                </label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="text"
                                    id="last_name"
                                    value={userData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pt-2">
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="email"
                                >
                                    INTRODUCE TU CORREO
                                </label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pt-2">
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="confirmEmail"
                                >
                                    CONFIRMA TU CORREO
                                </label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="email"
                                    id="confirmEmail"
                                    value={confirmEmail}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="pt-2">
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="password"
                                >
                                    CONTRASEÑA
                                </label>
                                <input
                                    className="w-full p-1 text-black placeholder:text-xs"
                                    type="password"
                                    id="password"
                                    placeholder="Una mayuscula, un numero y un caracter especial"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-2">
                                <label
                                    className="block text-white text-[0.78rem] font-geometos pb-1"
                                    htmlFor="confirmPassword"
                                >
                                    CONFIRMA TU CONTRASEÑA
                                </label>
                                <input
                                    className="w-full p-1 text-black"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="col-span-2 flex items-center mt-4 text-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-white text-xs font-geometos"
                                >
                                    Acepto los{" "}
                                    <a href="/terms" className="text-[#04d7af] underline">
                                        términos y condiciones
                                    </a>
                                </label>
                            </div>

                            <div className="col-span-2 my-3">
                                <button
                                    type="submit"
                                    className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full h-10 flex justify-center items-center"
                                >
                                    {loading ? (
                                        <ClipLoader color="#ffffff" loading={loading} size={20} />
                                    ) : (
                                        "CREAR CUENTA"
                                    )}
                                </button>
                            </div>

                            <div className="col-span-2 text-center">
                                <a
                                    href="/privacy"
                                    className="text-xs font-geometos text-[#04d7af] underline"
                                >
                                    Aviso de privacidad
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="border border-white w-full max-w-lg bg-white px-6 py-2">
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
                                <p>
                                    Obtén potenciales descuentos de temporada y por cliente
                                    frecuente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
