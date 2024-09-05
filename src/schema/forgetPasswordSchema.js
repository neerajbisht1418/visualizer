import * as yup from "yup";
const forgetPasswordSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
});
export { forgetPasswordSchema }