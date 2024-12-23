import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CityProvider } from "./components/Contexts/CitiesContext";
import { AuthProvider } from "./components/Contexts/AuthContext";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList/CityList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import CountryList from "./components/CountryList/CountryList";
import SpinnerFullPage from "./components/SpinnerFuulPage/SpinnerFullPage";

//import Homepage from "./pages/HomePage/Homepage";
//import Product from "./pages/Product/Product";
//import Pricing from "./pages/Pricing/Pricing";
//import Login from "./pages/Login/Login";
//import PageNotFound from "./pages/PafeNotfound/PageNotFound";
//import AppLayout from "./pages/AppLayout/AppLayout";

const Homepage = lazy(() => import("./pages/HomePage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Login = lazy(() => import("./pages/Login/Login"));
const PageNotFound = lazy(() => import("./pages/PafeNotfound/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}
export default App;
