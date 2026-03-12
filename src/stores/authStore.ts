import { create } from "zustand"
import { persist } from "zustand/middleware"

import { loginApi, registerApi, checkEmailExist } from "@/api/authApi"
import { type User } from "@/types/index"

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<void>
  register: (data: Omit<User, "id">) => Promise<void>
  logout: () => void
  updateProfile: (data: { fullName: string; phone: string }) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(

  persist(

    (set) => ({

      user: null,

      loading: false,

      error: null,

      login: async (email, password) => {

        set({ loading: true, error: null })

        try {
          const user = await loginApi(email)

          if (!user) {

            const message = "Email hoặc mật khẩu không đúng"
            set({ loading: false, error: message })
            throw new Error(message)

          }

          if (user.password !== password) {

            const message = "Email hoặc mật khẩu không đúng"
            set({ loading: false, error: message })
            throw new Error(message)

          }

          set({
            user,
            loading: false,
            error: null
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : "Lỗi đăng nhập"
          set({ loading: false, error: message })
          throw err
        }

      },

      register: async (data) => {

        set({ loading: true, error: null })

        try {
          const emailExist = await checkEmailExist(data.email)

          if (emailExist) {

            const message = "Email đã được đăng ký"
            set({ loading: false, error: message })
            throw new Error(message)

          }

          const newUser = await registerApi(data)

          set({
            user: newUser,
            loading: false,
            error: null
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : "Lỗi đăng ký"
          set({ loading: false, error: message })
          throw err
        }

      },

      logout: () => {
        localStorage.removeItem('auth-storage')
        set({ user: null, error: null })
      },

      clearError: () => {

        set({ error: null })

      },


      updateProfile: (data) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                fullName: data.fullName,
                phone: data.phone,
              }
            : null,
        })),

    }),

    {
      name: "auth-storage"
    }

  )

)