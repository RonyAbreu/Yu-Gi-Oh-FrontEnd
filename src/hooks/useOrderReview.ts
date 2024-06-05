import { useContext } from "react";
import { OrderReviewContext } from "../context/OrderReviewContext";

export const useOrderReview = () => {
    const context = useContext(OrderReviewContext);
    if (context === undefined) {
      throw new Error("Erro nos detalhes do pedido");
    }
    return context;
};