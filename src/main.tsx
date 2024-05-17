import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home.tsx";
import CardInfo from "./routes/card-info/CardInfo.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />} />
          <Route path="/card/:name" element={<CardInfo />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
