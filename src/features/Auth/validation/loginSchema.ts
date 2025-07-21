import * as yup from "yup";

export const loginSchema = yup.object({
  phone_number: yup
    .string()
    .required("Vui lòng nhập email hoặc số điện thoại")
    .test(
      "is-email-or-phone",
      "Email hoặc số điện thoại không hợp lệ",
      (value) => {
        if (!value) return false;

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(value);

        // Kiểm tra số điện thoại (10-13 số)
        const isPhone = /^[0-9]{10,13}$/.test(value);

        return isEmail || isPhone;
      }
    ),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Tối thiểu 6 ký tự"),
});
