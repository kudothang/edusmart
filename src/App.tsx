
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/ui/auth/authLayout'
import ProtectedRoute from './components/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const CourseListPage = lazy(() => import('./pages/CoursePage'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const MyCoursesPage = lazy(() => import('./pages/MyCoursesPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const CheckOutPage = lazy(() => import('./pages/CheckOutPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ProfilePage = lazy(() => import('./pages/Profile'))

const routeLoadingFallback = (
  <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm font-medium text-emerald-700">
    Dang tai noi dung...
  </div>
)

function App() {
  return (
    <Suspense fallback={routeLoadingFallback}>
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
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  )
}

export default App
