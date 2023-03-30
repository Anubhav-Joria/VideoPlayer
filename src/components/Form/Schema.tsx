import { object, string, number } from "yup";

export const userSchema = object({
  name: string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .required()
    .min(3),
  link: string().required(),
  bucket: string().required(),
});
