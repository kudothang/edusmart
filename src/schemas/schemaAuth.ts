import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email bắt buộc"),

  password: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu bắt buộc")
})

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .required("Tên bắt buộc"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email bắt buộc"),
  phone:yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Số điện thoại bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải chứa chữ hoa")
    .matches(/[0-9]/, "Mật khẩu phải chứa chữ số")
    .required("Mật khẩu bắt buộc"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp")
    .required("Xác nhận mật khẩu bắt buộc")
})
export const updateProfileSchema = registerSchema.pick([
  "fullName",
  "phone",
])