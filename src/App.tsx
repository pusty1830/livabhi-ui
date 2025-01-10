import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout";
import { Home } from "./pages/Home";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { NewsBlogs } from "./pages/News/NewsBlogs";
import { Artists } from "./pages/Artist/Artists";
import LoginPage from "./pages/Account/Login";
import SignupPage from "./pages/Account/Signup";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ResetPassword from "./pages/Account/ResetPassword";
import Account from "./pages/Account/Account";
import { Portfolio } from "./pages/Portfolio/Portfolio";
import JobDetailsPage from "./pages/Career/JobDetailsPage";
import { Career } from "./pages/Career/Career";
import JobApplicationForm from "./pages/Career/JobApplicationForm";
import NewsDetails from "./pages/News/NewsDetails";
import { ShopLandingPage } from "./pages/Shop/ShopLandingPage";
import ProductDetails from "./pages/Shop/ProductDetails";
import PortfolioForm from "./pages/Portfolio/PortfolioForm/ProfileForm";
import PortfolioFormTabs from "./pages/Portfolio/PortfolioForm/PortfolioFormTabs";
import VerifyOtp from "./pages/Account/VerifyOtp";
import { ToastContainer } from 'react-toastify';
import JobPostingForm from "./pages/Career/JobPostingForm";
import CourseUploadForm from "./pages/Shop/ProductUploadForm";
import UploadCourse from "./pages/Shop/UploadCourse";
import CartPage from "./pages/Shop/CartPage";

import AristMyCourse from "./pages/Shop/AristMyCourse";
import Player from "./pages/Shop/Player";
import CourseDetails from "./pages/Shop/CourseDetails";
import CategoryPage from "./components/utils/CategoryPage";
import MyCourses from "./pages/Shop/MyCourses";
import { Portfolio1 } from "./pages/Portfolio/Portfolio1";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailsPage from "./pages/Movies/MovieDetailsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsAndConditionsPage from "./pages/TermsAndConditions";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import MyOrderPage from "./pages/Account/MyOrderPage";
import AddNewsandBlogsPage from "./pages/Admin/AddNewsandBlogs/AddNewsandBlogsPage";
import EditNewsAndBlogs from "./pages/Admin/AddNewsandBlogs/EditNewsandBlogs";
import AddMovie from "./pages/Admin/AddMovie";
import PrivateRoute from "./components/shared/PrivateRoute";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                  <Route path="/news&blogs" element={<PrivateRoute component={NewsBlogs} />} />
                  <Route path="/news-details/:id" element={<PrivateRoute component={NewsDetails} />} />
                  <Route path="/artists" element={<PrivateRoute component={Artists} />} />
                  <Route path="/career" element={<PrivateRoute component={Career} />} />

                  <Route path="/job-details/:id" element={<PrivateRoute component={JobDetailsPage} />} />
                  <Route path="/job-application-form" element={<PrivateRoute component={JobApplicationForm} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/account" element={<PrivateRoute component={Account} />} />
                  <Route path="/course-upload" element={<PrivateRoute component={CourseUploadForm} />} />
                  <Route path="/upload" element={<PrivateRoute component={UploadCourse} />} />

                  <Route path="/portfolio/:id" element={<PrivateRoute component={Portfolio} />} />
                  <Route path="/portfolio-form" element={<PrivateRoute component={PortfolioFormTabs} />} />
                  <Route path="/mycorse" element={<PrivateRoute component={AristMyCourse} />} />

                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<PrivateRoute component={ResetPassword} />} />
                  <Route path="/shop" element={<PrivateRoute component={ShopLandingPage} />} />
                  <Route path="/productDetails/:id" element={<PrivateRoute component={ProductDetails} />} />
                  <Route path="/cart" element={<PrivateRoute component={CartPage} />} />
                  <Route path="/verify-otp" element={<VerifyOtp />} />
                  <Route path="/job-post" element={<JobPostingForm />} />
                  <Route path="/player/:id" element={<PrivateRoute component={Player} />} />
                  <Route path="/artist-courses" element={<PrivateRoute component={AristMyCourse} />} />
                  <Route path="/my-order" element={<PrivateRoute component={MyOrderPage} />} />

                  <Route path="/my-courses" element={<PrivateRoute component={MyCourses} />} />
                  <Route path="/courseDetails" element={<PrivateRoute component={CourseDetails} />} />
                  <Route path="/categories" element={<CategoryPage />} />

                  <Route path='/portfolio1/:id' element={<PrivateRoute component={Portfolio1} />} />
                  <Route path='/movies' element={<PrivateRoute component={MoviePage} />} />
                  <Route path='/movies/details/:id' element={<PrivateRoute component={MovieDetailsPage} />} />

                  <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                  <Route path='/terms-conditions' element={<TermsAndConditionsPage />} />

                  {/*Admin pages  */}
                  <Route path="/admin-dashboard" element={<AdminHomepage />} />
                  <Route path="/addnewsandblogs" element={<AddNewsandBlogsPage />} />
                  <Route path="/edit-news-and-blogs/:id" element={<EditNewsAndBlogs />} />
                  <Route path="/add-movie" element={<AddMovie />} />


                </Routes>
              </Layout>
            }
          />
        </Routes>
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
