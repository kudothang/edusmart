import axios from "axios";
import { type User } from "../types/index"

const axiosClient = axios.create({
  baseURL: "https://697f027dd1548030ab64f01c.mockapi.io/api/v1/",
}
);
export const loginApi = async (email: string) => {
  const res = await axiosClient.get<User[]>(`/users?email=${email}`)
  return res.data[0]
}

export const registerApi = async (data: User) => {
  const res = await axiosClient.post<User>("/users", data)
  return res.data
}


export const checkEmailExist = async (email: string) => {
  try {
    const res = await axiosClient.get<User[]>(`/users?email=${email}`)
    return res.data.length > 0
  } catch (error) {
    console.error('Error checking email:', error)
    return false
  }
}