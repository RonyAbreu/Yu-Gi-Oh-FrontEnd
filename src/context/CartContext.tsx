import React, { createContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartProviderResponse {
  countItens: number;
  setCountItens: (count: number) => void;
  cartItens: CartItem[];
  setCartItens: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartProviderResponse | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [countItens, setCountItens] = useState<number>(0);
  const [cartItens, setCartItens] = useState<CartItem[]>([]);

  const providerResponse: CartProviderResponse = {
    countItens,
    setCountItens,
    cartItens,
    setCartItens,
  };

  return (
    <CartContext.Provider value={providerResponse}>
      {children}
    </CartContext.Provider>
  );
};