import apiClient from "@/lib/api/axios";
import { EmployeFormData } from "../entites/employe-end";

export async function updateUserProfile(
  userId: number,
  payload: Partial<EmployeFormData>
): Promise<EmployeFormData> {
  const response = await apiClient.put<EmployeFormData>(
    `/utilisateurs/me/${userId}`,
    payload
  );

  return response.data;
}
