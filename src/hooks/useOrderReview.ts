import { useState } from "react"
import { Address } from "../types/Address"

export type OrderDetails = {
    address : Address
    payment : string
}

export const useOrderReview = () => {

    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    return {orderDetails, setOrderDetails}
}