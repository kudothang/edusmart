
import { Routes, Route } from 'react-router'
import './App.css'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/ui/auth/authLayout'
import CourseDetail from './pages/CourseDetail'
import CourseListPage from './pages/CoursePage'
import MyCoursesPage from './pages/MyCoursesPage'
import CartPage from './pages/CartPage'
import BlogPage from './pages/BlogPage'
import CheckOutPage from './pages/CheckOutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/Profile'

function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart-page"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>}
          />
          <Route
            path="/blogs"
            element={<BlogPage />} />
          <Route
            path="/contact"
            element={<ContactPage />} />
             <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>} />
        </Route>
      
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
  
       
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </>
  )
}

export default App
