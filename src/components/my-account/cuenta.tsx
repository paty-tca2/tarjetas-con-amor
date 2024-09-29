"use client";
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const MiCuenta: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "loading") return;

      if (!session) {
        toast.error("No estás autenticado");
        router.push("/auth/sign-in");
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const userData = await response.json();
        setUserInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone || '',
        });
      } catch (error) {
        toast.error("Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("No estás autenticado");
      router.push("/auth/sign-up");
      return;
    }

    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
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
                    name="firstName"
                    value={userInfo.firstName}
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
