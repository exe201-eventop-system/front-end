import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email hoặc tên đăng nhập")
    .test(
      "is-email-or-username",
      "Email hoặc tên đăng nhập không hợp lệ",
      (value) => {
        if (!value) return false;

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-zA-Z0-9_.-]{3,30}$/.test(value); 

        return isEmail || isUsername;
      }
    ),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Tối thiểu 6 ký tự"),
});
