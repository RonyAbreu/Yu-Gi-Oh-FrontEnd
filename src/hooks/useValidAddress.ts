import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useValidAddress = () => {
  const schema = yup.object({
    street: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Mínimo de 3 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Digite apenas letras"),

    burgh: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Mínimo de 3 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Digite apenas letras"),

    number: yup
      .string()
      .required("Campo obrigatório"),

    city: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Mínimo de 3 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Digite apenas letras"),

    state: yup
      .string()
      .required("Campo obrigatório")
      .min(2, "Mínimo de 2 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Digite apenas letras"),

    payment: yup
      .string()
      .required("Selecione uma forma de pagamento")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};