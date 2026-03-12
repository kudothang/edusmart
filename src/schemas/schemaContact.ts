import * as yup from "yup"

export const contactSchema = yup.object({
  fullName: yup
    .string()
    .required("Họ và tên là bắt buộc")
    .min(2, "Họ và tên tối thiểu 2 ký tự"),

  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không hợp lệ"),

  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),

  subject: yup
    .string()
    .required("Chủ đề là bắt buộc")
    .min(4, "Chủ đề tối thiểu 4 ký tự"),

  message: yup
    .string()
    .required("Nội dung là bắt buộc")
    .min(10, "Vui lòng nhập nội dung chi tiết hơn"),
})

export type ContactFormValues = yup.InferType<typeof contactSchema>

