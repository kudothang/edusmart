import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ShoppingCart, User, ChevronDown, Bell, LogOut,  Library } from "lucide-react";
import { useCourseFilterStore, } from "../../../stores/courseFilterStore";
import { useAuthStore } from "@/stores/authStore";

import HeaderSearch from "./HeaderSearch";

import CartButton from "./CartButton";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const { search, setSearch } = useCourseFilterStore();
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation()
  const {pathname} = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const notificationCount = 5;

  const handleLogout = () => {
    logout();
    setOpenMenu(false);
    setShowUserDropdown(false);
  };

  const handleMobileSearch = () => {
    if (mobileSearchInput.trim()) {
      setSearch(mobileSearchInput.trim());
      navigate("/courses");
      setMobileSearchInput("");
      setShowMobileSearch(false);
    }
  };

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng driopdown search suggestions khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserDropdown && !(e.target as Element).closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
      if (showSearchSuggestions && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserDropdown, showSearchSuggestions]);



  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/courses", label: "Khóa học" },
    { path: "/my-courses", label: "Khóa học của tôi" },
    { path: "/blogs", label: "Blog" },
    { path: "/contact", label: "Liên hệ" },
  ];



  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b"
          }`}
      >
        <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Hamburger (mobile) */}
              <button
                className="md:hidden"
                onClick={() => setOpenMenu(true)}
                aria-label="Menu"
              >
                <Menu size={26} className="text-gray-700 hover:text-emerald-600" />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <div className="h-10 w-10 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ES</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-emerald-700 tracking-tight">
                    Edu<span className="text-emerald-900">Smart</span>
                  </div>
                  <div className="text-xs text-gray-500 -mt-1">Học tập thông minh</div>
                </div>
              </Link>
            </div>

            {/* Menu desktop */}
            <nav className="hidden md:flex items-start gap-1 max-w-2xl text-nowrap">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all text-sm ${location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <HeaderSearch />


            {/* Right */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {/* Search mobile */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-600"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                title="Tìm kiếm khóa học"
              >
                <Search size={20} />
              </button>

              {/* Notification */}
              <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              {user && <CartButton />}

              {/* User/Auth */}
              {!user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/login"
                    state={{ from: pathname }}   // lưu state trang trước khi đăng nhập
                    className="px-3 py-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors text-sm"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    state={{ from: pathname }}
                    className="px-3 py-2 bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg font-medium text-sm"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="relative user-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdown(!showUserDropdown);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  > 
                      <img
                        src={user.avatar}
                        alt={user.fullName || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* User dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                        <div className="mt-2 flex items-center">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                            {user.role === "student" ? "Học viên" : user.role}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <User size={16} className="mr-3" />
                        Hồ sơ của tôi
                      </Link>
                      <Link
                        to="/my-courses"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Library size={16} className="mr-3"/>
                        Khóa học của tôi
                      </Link>

                      <div className="border-t mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
                        >
                          <LogOut size={16} className="mr-3" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth mobile */}
              {!user && (
                <Link
                  to="/login"
                  state={{ from: pathname }}
                  className="md:hidden px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
                >
                  <User size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden bg-white border-b px-3 sm:px-4 py-2 sm:py-3">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleMobileSearch();
          }}>
            <div className="relative flex gap-2">
              <input
                type="text"
                value={mobileSearchInput}
                onChange={(e) => setMobileSearchInput(e.target.value)}
                placeholder="Tìm khóa học..."
                autoFocus
                className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Tìm
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMobileSearch(false);
                  setMobileSearchInput("");
                }}
                className="px-2 py-2 text-gray-600 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full max-w-xs sm:max-w-sm md:max-w-md bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b">
          <Link
            to="/"
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EC</span>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700">EduCourse</div>
              <div className="text-xs text-gray-500">Học tập thông minh</div>
            </div>
          </Link>
          <button
            onClick={() => setOpenMenu(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Search mobile in menu */}
        <div className="p-3 sm:p-4 md:p-6 border-b">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) {
              setSearch(search.trim());
              navigate("/courses");
              setOpenMenu(false);
            }
          }}>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (search.trim()) {
                      setSearch(search.trim());
                      navigate("/courses");
                      setOpenMenu(false);
                    }
                  }
                }}
                placeholder="Tìm khóa học..."
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <Search
                size={20}
                className="absolute left-3 top-3.5 text-gray-400 cursor-pointer"
                onClick={() => {
                  if (search.trim()) {
                    setSearch(search.trim());
                    navigate("/courses");
                    setOpenMenu(false);
                  }
                }}
              />
            </div>
          </form>
        </div>

        {/* Menu items */}
        <div className="p-2 sm:p-3 md:p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpenMenu(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <h3 className="px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3">TÀI KHOẢN</h3>
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  state={{ from: pathname }}
                  onClick={() => setOpenMenu(false)}
                  className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-emerald-600 text-emerald-600 text-center hover:bg-emerald-50 font-medium text-sm"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  state={{ from: pathname }}
                  onClick={() => setOpenMenu(false)}
                  className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-emerald-600 text-white text-center hover:bg-emerald-700 font-medium text-sm"
                >
                  Đăng ký tài khoản
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-3" />
                  Hồ sơ của tôi
                </Link>
                <Link
                  to="/my-courses"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="mr-3">📚</span>
                  Khóa học của tôi
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  Giỏ hàng (0)
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center"
                >
                  <span className="mr-3">🚪</span>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

       
        </div>
      </div>
    </>
  );
}

export default Header;