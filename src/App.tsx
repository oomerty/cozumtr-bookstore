import { lazy, Suspense, useSyncExternalStore } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./lib/swrConfig";

import "./App.css";
import { CategoryProvider } from "./contexts/CategoryContext";
import { LikeProvider } from "./contexts/LikeContext";

import Nav from "./components/general/Nav";
import Message from "./components/general/Message";
import { CartProvider } from "./contexts/CartContext";
import Spinner from "./components/general/Spinner";
import ProtectedRoute from "./components/general/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));
const Liked = lazy(() => import("./pages/Liked"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Purchase = lazy(() => import("./pages/Purchase"));

function App() {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <BrowserRouter>
        <Suspense fallback={<Spinner fullScreen={true} />}>
          <Routes>
            {/* AUTH STACK */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* APPLICATION */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="product/:slug" element={<Product />} />
              <Route path="category/:id" element={<Category />} />
              <Route path="liked-products" element={<Liked />} />
              {/* CART */}
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="purchase-confirmation" element={<Purchase />} />
              {/* ERROR */}
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
        </Suspense>
      </BrowserRouter>
    </SWRConfig>
  );
}

function MainLayout() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  function getSnapshot() {
    return navigator.onLine;
  }

  function subscribe(callback: () => void) {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }

  return (
    <CategoryProvider>
      <LikeProvider>
        <CartProvider>
          <div className="font-manrope">
            <Nav />
            <main className="flex flex-col gap-8 md:gap-12 px-6 md:px-12 py-6 md:py-8 font-manrope overflow-x-hidden md:overflow-x-auto">
              {!isOnline && (
                <Message
                  title="You Are Offline"
                  message="We cannot connect to servers right now - please check your internet connection and try again"
                />
              )}
              {isOnline && <Outlet />}
            </main>
          </div>
        </CartProvider>
      </LikeProvider>
    </CategoryProvider>
  );
}

export default App;
