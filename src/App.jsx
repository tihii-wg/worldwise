import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PafeNotfound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
