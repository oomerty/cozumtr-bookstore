import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

import Home from "./pages/Home";
import { Login, Signup } from "./pages/Auth";
import Nav from "./components/general/Nav";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Message from "./components/general/Message";
import Button from "./components/general/Button";

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CategoryProvider>
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
        </CategoryProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

function MainLayout() {
  return (
    <div className="font-manrope">
      <Nav />
      <main className="flex flex-col gap-8 md:gap-12 px-6 md:px-12 py-6 md:py-8 font-manrope overflow-x-hidden md:overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
