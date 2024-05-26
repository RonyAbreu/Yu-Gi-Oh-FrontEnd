import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useValidCep = () => {
  const schema = yup
    .object({
      cep: yup
      .string()
      .required("Campo obrigatório")
      .matches(/^\d+$/, "O campo deve conter apenas números")
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return {register, handleSubmit, errors}
};
