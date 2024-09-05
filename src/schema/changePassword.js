import * as yup from "yup";
const changePasswordSchema = yup.object({
    current_password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("New Password is required"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords do not match")
        .required("Confirm Password is required"),
});
export { changePasswordSchema }