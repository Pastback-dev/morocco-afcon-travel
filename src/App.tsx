import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import CityStadiumsPage from "./pages/CityStadiumsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import StadiumDetailsPage from "./pages/StadiumDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminConnectLogin from "./pages/AdminConnectLogin";
import ClientManagementPage from "./pages/admin/ClientManagementPage";
import RevenueReportsPage from "./pages/admin/RevenueReportsPage";
import PackageManagementPage from "./pages/admin/PackageManagementPage";
import PackageFormPage from "./pages/admin/PackageFormPage";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminconnect" element={<AdminConnectLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/stadiums/:cityName" element={<CityStadiumsPage />} />
            <Route path="/hotels/:hotelName" element={<HotelDetailsPage />} />
            <Route path="/stadiums/details/:stadiumName" element={<StadiumDetailsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="clients" element={<ClientManagementPage />} />
              <Route path="revenues" element={<RevenueReportsPage />} />
              <Route path="packages" element={<PackageManagementPage />} />
              <Route path="packages/new" element={<PackageFormPage />} />
              <Route path="packages/edit/:packageId" element={<PackageFormPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;