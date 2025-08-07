import * as yup from "yup";

export const supplierSignUpSchema = yup.object({
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
        .required("Số điện thoại là bắt buộc"),
    location: yup
        .string()
        .min(10, "Địa chỉ phải có ít nhất 10 ký tự")
        .required("Địa chỉ là bắt buộc"),
    nameOrganization: yup
        .string()
        .min(2, "Tên tổ chức phải có ít nhất 2 ký tự")
        .max(100, "Tên tổ chức không được quá 100 ký tự")
        .required("Tên tổ chức là bắt buộc"),
    taxCode: yup
        .string()
        .matches(/^[0-9]{10,13}$/, "Mã số thuế phải có 10-13 chữ số")
        .required("Mã số thuế là bắt buộc"),
    description: yup
        .string()
        .max(500, "Mô tả không được quá 500 ký tự")
        .optional(),
    about: yup
        .string()
        .max(1000, "Thông tin về không được quá 1000 ký tự")
        .optional(),
});

export type SupplierSignUpFormData = yup.InferType<typeof supplierSignUpSchema>;
