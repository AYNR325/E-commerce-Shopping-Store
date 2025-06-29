import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Suspense, lazy } from "react";
import { checkAuth } from "./store/authSlice/authSlice";
import { Skeleton } from "@/components/ui/skeleton"
import LoadingSpinner from "./components/LoadingSpinner";
import CheckAuth from "./components/common/CheckAuth";
import PerformanceMonitor from "./components/PerformanceMonitor";

// Lazy load components for better performance
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminLayout = lazy(() => import("./components/admin-view/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin-view/AdminOrders"));
const ShoppingLayout = lazy(() => import("./components/shopping-view/ShoppingLayout"));
const NotFound = lazy(() => import("./pages/not-found"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/ShoppingAccount"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/ShoppingCheckout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/ShoppingHome"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/ShoppingListing"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));
const SearchPage = lazy(() => import("./pages/shopping-view/SearchPage"));
const OrderSuccess = lazy(() => import("./pages/shopping-view/OrderSuccess"));
const OrderCancel = lazy(() => import("./pages/shopping-view/OrderCancel"));

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <PerformanceMonitor />
      <div className="flex flex-col overflow-hidden bg-white">
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </div>
    </>
  );
}

export default App;
