import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home.tsx";
import CardInfo from "./routes/card-info/CardInfo.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import Cart from "./routes/cart/Cart.tsx";
import Checkout from "./routes/checkout/Checkout.tsx";
import OrderReview from "./routes/order-review/PurchaseReview.tsx";
import { OrderReviewProvider } from "./context/OrderReviewContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <OrderReviewProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index path="/" element={<Home />} />
              <Route path="/card/:name" element={<CardInfo />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/review" element={<OrderReview />} />
            </Route>
          </Routes>
        </HashRouter>
      </OrderReviewProvider>
    </CartProvider>
  </React.StrictMode>
);
