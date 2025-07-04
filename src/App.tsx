import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./lib/swrConfig";

import "./App.css";
import { CategoryProvider } from "./contexts/CategoryContext";
import { LikeProvider } from "./contexts/LikeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";

import Nav from "./components/general/Nav";
import Message from "./components/general/Message";
import Liked from "./pages/Liked";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./pages/Checkout";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <BrowserRouter>
        <Routes>
          {/* AUTH STACK */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* APPLICATION */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="liked-products" element={<Liked />} />
            {/* CART */}
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="purchase-confirmation" element={<Purchase />} />
            <Route
              path="*"
              element={
                <Message
                  title="404"
                  message="This page cannot be found - please try again or start discovering from our homepage"
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
}

function MainLayout() {
  return (
    <CategoryProvider>
      <LikeProvider>
        <CartProvider>
          <div className="font-manrope">
            <Nav />
            <main className="flex flex-col gap-8 md:gap-12 px-6 md:px-12 py-6 md:py-8 font-manrope overflow-x-hidden md:overflow-x-auto">
              <Outlet />
            </main>
          </div>
        </CartProvider>
      </LikeProvider>
    </CategoryProvider>
  );
}

export default App;
