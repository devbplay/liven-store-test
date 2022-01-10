import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Cart } from "./pages/cart";

export default function MyRoutes() {
    return(
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </BrowserRouter>
    );
}
