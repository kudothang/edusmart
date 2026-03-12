import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .required("Họ tên là bắt buộc")
    .min(2, "Họ tên tối thiểu 2 ký tự"),

  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không hợp lệ"),

  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),

  address: yup
    .string()
    .required("Địa chỉ là bắt buộc")
    .min(5, "Địa chỉ quá ngắn"),

  paymentMethod: yup
    .string()
    .required("Vui lòng chọn phương thức thanh toán"),
});

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;