import * as yup from "yup";

//Validations for checking the profile values
export const newProfileSchema = yup
  .object({
    name: yup.string().trim().min(3).max(100).required(),
    about: yup.string().trim().min(3).max(100).required(),
    sites: yup.array().of(
      yup.object().shape({
        id: yup.string().trim(),
        siteName: yup.string().trim().min(3).max(100).required(),
        siteUrl: yup.string().trim().min(3).max(100).url().required(),
      })
    ),
  })
  .required();

//Validations for checking user login form values
export const userLoginSchema = yup
  .object({
    email: yup.string().trim().lowercase().email().required(),
    password: yup.string().trim().required(),
  })
  .required();
