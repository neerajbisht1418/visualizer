import * as yup from "yup";
const signupSchema = yup.object({
    first_name: yup.string().required("First Name is required").matches(/^[A-Za-z]+$/, "First Name can only contain alphabetic characters"),
    last_name: yup.string().required("Last Name is required").matches(/^[A-Za-z]+$/, "Last Name can only contain alphabetic characters"),
    phone_number: yup
      .string()
      .length(10, "Phone Number must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Phone Number must be digits only")
      .required("Phone Number is Required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });
  export {signupSchema}