import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AlertCircle, Check, Loader, Eye, EyeOff } from "lucide-react"

import { registerSchema } from "../schemas/schemaAuth"
import { useAuthStore } from "../stores/authStore"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

interface RegisterForm {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const passwordRequirements = [
  { label: "Ít nhất 6 ký tự", regex: /.{6}/ },
  { label: "Chứa chữ hoa (A-Z)", regex: /[A-Z]/ },
  { label: "Chứa chữ số (0-9)", regex: /[0-9]/ }
]

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser, loading, error, clearError } = useAuthStore()

  const [passwordValue, setPasswordValue] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  })
  const { register, formState:{ errors, isValid } } = form

  const onSubmit = async (data: RegisterForm) => {
    try {
      clearError()
      const newUser = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: "student",
        phone: data.phone,
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${data.email}`,
        createdAt: new Date().toISOString()
      }
      await registerUser(newUser)
      navigate("/login")
    } catch (err) {
      console.error("Register error:", err)
    }
  }

  return (
    <Card className="w-100 border-emerald-100 shadow-lg shadow-emerald-100/60">
      <CardHeader>
        <CardTitle className="text-2xl pt-3 text-emerald-700">Tạo Tài Khoản</CardTitle>
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
          {/* Full Name */}
          <div className="space-y-1">
            <Input
              placeholder="Họ và tên"
              {...register("fullName")}
              className={`${
                errors.fullName
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-emerald-100 focus-visible:ring-emerald-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`${
                form.formState.errors.email
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
          {/* Phone */}
           <div className="space-y-1">
            <Input
              placeholder="Số điện thoại"
              {...register("phone")}
              className={`${
                errors.phone
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-emerald-100 focus-visible:ring-emerald-500"
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
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
                onChange={(e) => {
                  register("password").onChange(e)
                  setPasswordValue(e.target.value)
                }}
                className={`pr-10 ${
                  form.formState.errors.password
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

            {/* Password Requirements */}
            {passwordValue && (
              <div className="mt-3 space-y-2 p-3 bg-gray-50 rounded-md">
                {passwordRequirements.map((req) => {
                  const isMet = req.regex.test(passwordValue)
                  return (
                    <div key={req.label} className="flex items-center gap-2">
                      <Check
                        size={16}
                        className={isMet ? "text-green-500" : "text-gray-300"}
                      />
                      <span
                        className={`text-xs ${
                          isMet
                            ? "text-green-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                {...register("confirmPassword")}
                className={`pr-10 ${
                  errors.confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-emerald-100 focus-visible:ring-emerald-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
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
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Đăng nhập
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}