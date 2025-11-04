import apiClients from "@/lib/api/axios";
import { AuthRequest } from "../entities/auth-entities";

/**
 * 
 * @param data 
 * @returns 
 */
export async function AuthService(data:AuthRequest) {
    const request = await apiClients.post('/auth/login', data);
    return request.data as any;
}

export async function updateUser(data:AuthRequest) {
    const request = await apiClients.put('/auth/me', data);
    return request.data as any;
}

/**
 * 
 * @returns 
 */
export async function UserMe(){
    const request =  await apiClients.get('/auth/me');
    return request.data as any;
}


export const auth = {AuthService}