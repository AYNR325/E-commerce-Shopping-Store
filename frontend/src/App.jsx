import { Routes, Route,Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice/authSlice";
import { Skeleton } from "@/components/ui/skeleton"
import SearchPage from "./pages/shopping-view/SearchPage";
import OrderSuccess from "./pages/shopping-view/OrderSuccess";
import OrderCancel from "./pages/shopping-view/OrderCancel";

function App() {
  // const isAuthenticated = false;
  // const user = {
  //   role: "user",
  // };

  const { isAuthenticated, user,isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token=JSON.parse(sessionStorage.getItem('token'));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />


  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        {/* common components */}
        
        <Routes>
          <Route
           path="/"
           element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }
           />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route index element={<Navigate to="/shop/home" replace />} />
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="success" element={<OrderSuccess />} />
            <Route path="cancel" element={<OrderCancel />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
