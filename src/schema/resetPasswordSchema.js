import * as yup from "yup";
const resetPasswordSchema = yup.object({
    new_password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    new_password_confirm: yup
        .string()
        .oneOf([yup.ref("new_password"), null], "Passwords do not match")
        .required("Confirm Password is required"),
});
export { resetPasswordSchema }