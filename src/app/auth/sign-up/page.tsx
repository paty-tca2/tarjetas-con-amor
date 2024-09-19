"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AuthRepositoryImpl } from "@/core/repositories/AuthRepository";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Either, fold } from "fp-ts/Either";
import ClipLoader from "react-spinners/ClipLoader";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import LoaderModal from "@/components/ui/loader_modal";
import {RegisterUserUseCase} from "@/core/usecases/auth/RegisterUserUseCase";

const authRepository = new AuthRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(authRepository);

export default function SignUp() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [confirmEmail, setConfirmEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const validatePassword = (password: string) => {
        const uppercasePattern = /[A-Z]/;
        const numberPattern = /[0-9]/;
        const specialCharacterPattern = /[^A-Za-z0-9]/;

        if (!uppercasePattern.test(password)) {
            return "La contraseña debe contener al menos una letra mayúscula";
        }
        if (!numberPattern.test(password)) {
            return "La contraseña debe contener al menos un número";
        }
        if (!specialCharacterPattern.test(password)) {
            return "La contraseña debe contener al menos un carácter especial";
        }
        return null;
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

        const passwordError = validatePassword(userData.password);
        if (passwordError) {
            toast.error(passwordError, {
                position: "top-center",
            });
            return;
        }

        setLoading(true);

        const result: Either<string, any> = await registerUserUseCase.execute({
            email: userData.email,
            username: userData.email,
            password: userData.password,
            first_name: userData.first_name,
            last_name: userData.last_name,
        });

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
                setUserData({
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                });
                setConfirmEmail("");
                setConfirmPassword("");
                setIsChecked(false);
            }
        )(result);

        setLoading(false);
    };

    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center py-24 sm:py-32 mt-10">
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

            <div className="relative z-10 flex flex-col items-start justify-start sm:justify-center p-6 pt-1 min-h-screen sm:min-h-screen">
                <div className="pb-4">
                    <div className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-20 pb-6">
                        <div className="text-left">
                            <h1 className="text-[1.4rem] sm:text-[1.8rem] md:text-[2rem] font-geometos">
                                <span style={{ color: "#ffffff" }}>¿Tienes </span>
                                <span style={{ color: "#04d7af" }}>cuenta?</span>
                            </h1>
                        </div>
                        <Link href="/auth/login">
                            <button
                                className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-[7rem] h-10 sm:w-80 text-[1rem] sm:text-[1.25rem]">INGRESA
                            </button>
                        </Link>
                    </div>
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-geometos">
                        <span style={{ color: "#ffffff" }}>¿No tienes? </span>
                        <span style={{ color: "#04d7af" }}>Regístrate ahora</span>
                    </h1>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-center">
                    <div className="border border-white w-full px-6 py-8 max-w-lg">
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
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
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
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
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
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
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
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
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
                                    htmlFor="password"
                                >
                                    CONTRASEÑA
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full p-1 text-black placeholder:text-[10px] pr-10"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Una mayúscula, un número y un carácter especial"
                                        value={userData.password}
                                        onChange={handleChange}
                                        pattern="(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}"
                                        title="La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label
                                    className="block text-white text-[0.66rem] sm:text-[0.78rem] font-geometos pb-1"
                                    htmlFor="confirmPassword">CONFIRMA TU CONTRASEÑA
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full p-1 text-black pr-10"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handlePasswordChange}
                                        pattern="(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}"
                                        title="La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center mt-4 text-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    required
                                    title="Por favor, acepta los términos y condiciones"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-white text-xs font-geometos"
                                >
                                    Acepto los{" "}
                                    <a href="/terms" className="text-[#04d7af] underline">
                                        terminos y condiciones
                                    </a> y el  <a
                                    href="/privacy"
                                    className="text-xs font-geometos text-[#04d7af] underline"
                                >
                                    Aviso de privacidad
                                </a>
                                </label>
                            </div>

                            <div className="my-3">
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
                        </form>
                    </div>

                    <div className="border border-white w-full max-w-lg bg-white px-6 py-2">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/logo-principal.png"
                                alt="Descripción de la imagen"
                                width={260}
                                height={260}
                                className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px]"
                                layout="intrinsic"
                            />
                        </div>
                        <h2 className="text-lg font-bold  text-[#5d60a6] font-geometos text-center">Beneficios</h2>
                        <div className="flex flex-col text-[#5d60a6] space-y-4 text-[0.88rem] font-geometos">
                            <div className="normal-case">
                                <p className="pb-3">1) Recordatorios:</p>
                                <p>Nunca vuelvas a olvidar una ocasion especial.</p>
                            </div>
                            <div>
                                <p className="pb-3">2) Ahorra tiempo y dinero:</p>
                                <p>Direcciones y metodos de pago seleccionados.</p>
                            </div>
                            <div>
                                <p className="pb-3">3) Promociones:</p>
                                <p>
                                    Obten potenciales descuentos de temporada y por cliente
                                    frecuente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoaderModal loading={loading} />
            <ToastContainer />
        </div>
    );
}
