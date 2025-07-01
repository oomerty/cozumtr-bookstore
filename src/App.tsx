import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

import Home from "./pages/Home";
import { Login, Signup } from "./pages/Auth";
import Nav from "./components/general/Nav";
import Category from "./pages/Category";

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
                <Route path="product/:slug" element={<Home />} />
                <Route path="category/:id" element={<Category />} />
                <Route path="*" element={<Home />} />
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
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
