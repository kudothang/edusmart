import { Outlet } from "react-router"
export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image full screen */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/vector-1753804354884-a16f102459cc?q=80&w=2322&auto=format&fit=crop"
          alt="auth background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-500/20" />
      </div>

      {/* Form content */}
      <div className="relative z-10 flex items-center justify-center p-4 sm:p-6">
        <Outlet/>
      </div>
    </div>
  )
}