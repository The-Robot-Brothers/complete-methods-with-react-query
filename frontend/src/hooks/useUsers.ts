import { useMutation, useQuery } from "react-query"
import { api } from "../services/api"

export type TUser = {
  id?: string
  username: string
  password?: string
  is_admin: boolean
  created_at?: string
  updated_at?: string
}

const resource = 'users'
const resourceUnique = 'user'

export function useGetUser() {
  return useQuery([resource], async () => await api.get<TUser[]>(resource))
}

export function useGetByIdUser(id: string) {
  return useQuery([resourceUnique, id], async () => await api.get<TUser>(`${resource}/${id}`))
}

export function usePostUser() {
  return useMutation(async (userData: TUser) => await api.post(resource, userData))
}

export function useUpdateUser(id: string) {
  return useMutation(async (userData: TUser) => await api.put(`${resource}/${id}`, userData))
}

export function useDeleteUser() {
  return useMutation(async (id: string) => await api.delete(`${resource}/${id}`))
}