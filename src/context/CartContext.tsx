import { createContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartProviderResponse {
  countItens: number;
  setCountItens: (count: number) => void;
  cartItens: CartItem[];
  setCartItens: React.Dispatch<React.SetStateAction<CartItem[]>>;
  removeItem: (id: number) => void;
}

export const CartContext = createContext<CartProviderResponse | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [countItens, setCountItens] = useState<number>(0);
  const [cartItens, setCartItens] = useState<CartItem[]>([]);

  const removeItem = (id: number) => {
    const newCartItems = cartItens.filter((item) => item.id !== id);
    setCartItens(newCartItems);
    setCountItens(newCartItems.length);
  };

  const providerResponse: CartProviderResponse = {
    countItens,
    setCountItens,
    cartItens,
    setCartItens,
    removeItem
  };

  return (
    <CartContext.Provider value={providerResponse}>{children}</CartContext.Provider>
  );
};