import { createContext, useState, ReactNode } from "react";
import { OrderDetail } from "../types/OrderDetail";

interface OrderReviewContextType {
  orderDetails: OrderDetail | null;
  setOrderDetails: (orderDetails: OrderDetail) => void;
}

export const OrderReviewContext = createContext<OrderReviewContextType | undefined>(undefined);

export const OrderReviewProvider = ({ children }: { children: ReactNode }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);

  return (
    <OrderReviewContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderReviewContext.Provider>
  );
};
