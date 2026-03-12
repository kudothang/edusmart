import { Link } from "react-router";
import { Facebook, Youtube, Instagram } from "lucide-react";

 function Footer() {
  return (
    <footer className="bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">

          {/* Brand */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              Edu<span className="text-emerald-200">Smart</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Nền tảng học trực tuyến giúp bạn nâng cao kỹ năng,
              phát triển sự nghiệp mọi lúc, mọi nơi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Liên kết</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-200 transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-emerald-200 transition">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-emerald-200 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-200 transition">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Hỗ trợ</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Theo dõi chúng tôi</h3>
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
              <a href="#" className="hover:text-emerald-200 transition">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-emerald-200 transition">
                <Youtube size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-emerald-200 transition">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-600 mt-6 sm:mt-8 md:mt-10 pt-3 sm:pt-4 md:pt-6 text-center text-xs sm:text-sm text-emerald-100">
          © {new Date().getFullYear()} EduSmart - Hướng tới tương lai
        </div>

      </div>
    </footer>
  );
}

export default Footer;