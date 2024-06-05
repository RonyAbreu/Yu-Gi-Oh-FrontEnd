import { useState } from "react"
import { OrderDetail } from "../types/OrderDetail";

export const useOrderReview = () => {

    const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);

    return {orderDetails, setOrderDetails}
}