import * as yup from "yup";

const touchSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .matches(/^[A-Za-z\s]+$/, "Name can only contain alphabetic characters and spaces"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    message: yup.string()
});

export { touchSchema }