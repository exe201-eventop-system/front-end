import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  user_name: yup.string().required("Tên đăng nhập là bắt buộc"),
  phone_number: yup
    .string()
    .matches(/^\d+$/, "Số điện thoại chỉ chứa số")
    .min(9, "Số điện thoại tối thiểu 9 số")
    .max(15, "Số điện thoại tối đa 15 số")
    .required("Số điện thoại là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});
