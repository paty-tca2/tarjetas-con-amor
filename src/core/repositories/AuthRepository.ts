// src/infrastructure/AuthRepositoryImpl.ts
import { ResponseHandler } from '@/core/ResponseHandler';
import { Either, left } from 'fp-ts/Either';
import axios from "axios";
import {registerUserService} from "@/core/infrastructure/AuthService";

export interface IAuthRepository {
    registerUser(userData: Record<string, any>): Promise<Either<string, any>>;
}

export class AuthRepositoryImpl implements IAuthRepository {
    async registerUser(userData: Record<string, any>): Promise<Either<string, any>> {
        try {
            const response = await registerUserService(userData);
            return ResponseHandler.handle(response, (data) => data);
        } catch (error) {
            let errorMessage = 'Error de conexión';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Error de conexión';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return left(errorMessage);
        }
    }
}
