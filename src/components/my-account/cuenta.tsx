"use client";
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Either, fold } from 'fp-ts/Either';
import { AuthRepositoryImpl } from '@/core/repositories/AuthRepository';
import { useRouter } from 'next/navigation';
import {GetProfileUseCase} from "@/core/usecases/auth/GetProfileUseCase";

const authRepository = new AuthRepositoryImpl();
const getProfileUseCase = new GetProfileUseCase(authRepository);

interface UserInfo {
  name: string;
  email: string;
  phone?: string;
}

const MiCuenta: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        toast.error("No estás autenticado");
        router.push("/auth/sign-up");
        return;
      }

      setLoading(true);

      const result: Either<string, any> = await getProfileUseCase.execute(token);

      fold(
          (error: string) => {
            toast.error(error);
            setLoading(false);
          },
          (data: any) => {
            setUserInfo({
              name: data.name || '',
              email: data.email || '',
              phone: data.phone || '', // Aquí puedes ajustar para datos de teléfono si existen
            });
            setLoading(false);
          }
      )(result);
    };

    fetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Agrega la lógica para guardar la información actualizada del usuario
    console.log("Updated user info:", userInfo);
  };

  return (
      <div className="mi-cuenta-container text-black">
        <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Mi Cuenta</h2>

        {loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaUser className="text-[#5D60a6]" />
                <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Nombre"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-[#5D60a6]" />
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Correo electrónico"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-[#5D60a6]" />
                <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Número de teléfono (opcional)"
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                  type="submit"
                  className="bg-[#04d9b2] hover:bg-[#5D60a6] transition-colors font-geometos text-white py-2 px-4 rounded-full"
              >
                Guardar cambios
              </button>
            </form>
        )}
        <ToastContainer />
      </div>
  );
};

export default MiCuenta;
