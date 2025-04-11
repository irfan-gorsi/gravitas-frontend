import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Product from "./pages/Admin dashboard/Products.jsx";
import ProductDetail from "./components/home components/ProductDetail.jsx"; 
import AdminRoute from "./AdminRoute.jsx";
import NavBar from "./components/admin components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx"; 
import { CartProvider } from "./context/CartContext"; 
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import AdminOrders from "./pages/Admin dashboard/AdminOrders.jsx";
import OrderDetails from "./pages/Admin dashboard/OrderDetails.jsx";
import BannerUploader from "./components/admin components/BannerUploader.jsx";

//  Public Layout (No Navbar)
const PublicLayout = () => {
  return <Outlet />; // Just renders public pages
};

//  Admin Layout (Includes Navbar)
const AdminLayout = () => {
  return (
    <>
      <NavBar /> {/* Admin Navbar */}
      <div className="container mt-4">
        <Outlet /> {/* Renders Admin Dashboard & Product */}
      </div>
    </>
  );
};

function App() {
  return (
    <CartProvider> {/*  Wrap App with Cart Context */}
    
      <Router>
        <Routes>
          {/*  Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/*  Add ProductDetail Route */}
            <Route path="/cart" element={<CartPage />} /> {/*  Add Cart Page Route */}
            <Route path="/checkout" element={<CheckoutPage />} /> {/*  New Route */}
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/product" element={<Product />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/orders/:id" element={<OrderDetails />} />
              <Route path="/admin/banners" element={<BannerUploader />} />

            </Route>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
