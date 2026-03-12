import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AlertCircle, Loader, Eye, EyeOff } from "lucide-react"

import { loginSchema } from "../schemas/schemaAuth"
import { useAuthStore } from "../stores/authStore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const form = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  })

  // Xoá message error khi hết lỗi 
  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  const onSubmit = async (data: LoginForm) => {
      clearError()
      await login(data.email, data.password)    
      const redirectPath = location.state?.from || "/"     
      navigate(  redirectPath , { replace: true })
  }

  const { register, formState: { errors, isValid } } = form

  return (
    <Card className="w-95 border-emerald-100 shadow-lg shadow-emerald-100/60">
      <CardHeader>
        <CardTitle className="text-2xl text-emerald-700">Đăng Nhập</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Server Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex gap-2">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <Input
              placeholder="Email"
              type="email"
              {...register("email")}
              className={`${
                errors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-emerald-100 focus-visible:ring-emerald-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                {...register("password")}
                className={`pr-10 ${
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-emerald-100 focus-visible:ring-emerald-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || loading}
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}