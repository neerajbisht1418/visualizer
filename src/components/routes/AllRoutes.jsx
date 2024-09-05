import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateLayout from "../layouts/PrivateLayout";
import ForgotPasswordPage from "../pages/ForgotPassword";
import RegistrationPage from "../pages/RegistrationPage";
import ProductListingPage from "../pages/product/ProductListingPage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Fqa from "../pages/Fqa";
import ServicePage from "../pages/ServicePage";
import Dashboard from "../pages/Dashboard";
import PrivacyPage from "../pages/PrivacyPage";
import TermConditionPage from "../pages/TermConditionPage";
import MenShirtModalComponent from "../modalStructure/men/MenShirtModalComponent";
import KurtiModalComponent from "../modalStructure/kurti/Kurti";
import WomenSaree from "../modalStructure/women/WomenSaree";
import SareeTwo from "../modalStructure/saree_two/SareeTwo";
import LungiWithShirt from "../modalStructure/lungi_shirt/LungiShirt";
import LungiWithoutShirt from "../modalStructure/lungi_without_shirt/LungiWithoutShirt";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLayout>
              <HomePage />
            </PrivateLayout>
          }
        />
        <Route
          path="/products/all"
          element={
            <PrivateLayout>
              <ProductListingPage />
            </PrivateLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateLayout>
              <ProductDetailPage />
            </PrivateLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />
        <Route
          path="/create-account"
          element={
            <PublicLayout>
              <RegistrationPage />
            </PublicLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicLayout>
              <ForgotPasswordPage />
            </PublicLayout>
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<Fqa />} />
        <Route path="/service" element={<ServicePage />} />
        {/* <Route
          path="/dashboard"
          element={
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          }
        /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/term-condition" element={<TermConditionPage />} />

        <Route path="/men-shirt" element={<MenShirtModalComponent />} />
        <Route path="/women-saree" element={<WomenSaree />} />

        <Route path="/kurti" element={<KurtiModalComponent />} />
        <Route path="/saree-two" element={<SareeTwo />} />
        <Route path="/lungi-shirt" element={<LungiWithShirt />} />
        <Route path="/lungi-without-shirt" element={<LungiWithoutShirt />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
