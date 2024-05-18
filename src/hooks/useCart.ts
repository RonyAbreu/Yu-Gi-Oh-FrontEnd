import { useContext } from "react";
import { CartContext, CartProviderResponse } from "../context/CartContext";

export const useCart = (): CartProviderResponse => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Contexto inválido");
  }
  return context;
};
