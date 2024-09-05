import * as yup from "yup";
const mobileSchema = yup.object({
    phone_number: yup
      .string()
      .length(10, "Phone Number must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Phone Number must be digits only")
      .required("Phone Number is Required"),
 
  });
  export {mobileSchema}