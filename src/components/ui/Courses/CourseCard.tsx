import { BookOpen, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";
import type { Course } from "../../../types/index";
import { formatPriceVn } from "../../../utils/Format";
import { useCartStore } from "../../../stores/cartStore";
import { useAuthStore } from "../../../stores/authStore";
import { message } from "antd";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course?: Course;
};

const CourseCard = function CourseCard({ course }: CourseCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const user = useAuthStore((s) => s.user);

  const handleAddToCart = () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để thêm khóa học vào giỏ hàng");
      return;
    }
    if (course) {
      addToCart(course);
      message.success("Đã thêm khóa học vào giỏ hàng");
    }
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md shadow-black/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 mb-3">
      {/* THUMBNAIL */}
      <div className="thumbnail-course sm:h-48 md:h-56 relative overflow-hidden">
        <Link to={`/courses/${course?.id}`}>
          <img
            src={course?.image}
            alt={course?.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Duration */}
        <Badge className="absolute right-3 top-3 bg-orange-500 text-white py-1 text-xs font-semibold">
          {course?.duration}
        </Badge>

        {/* Custom Badge */}
        {course?.badge && (
          <Badge className="absolute left-3 top-3 bg-red-500 text-white py-1 text-xs font-semibold">
            {course.badge}
          </Badge>
        )}
      </div>

      {/* CONTENT*/}
      <CardContent className=" flex flex-col gap-3">
        <Badge className="w-fit bg-emerald-600 text-white py-1 text-xs font-medium">
          {course?.level}
        </Badge>

        <Link
          to={`/courses/${course?.id}`}
          className="line-clamp-2 text-sm sm:text-base md:text-lg font-semibold leading-tight hover:text-green-600 transition-colors"
        >
          {course?.title}
        </Link>

        <p className="text-xs sm:text-sm text-gray-500 truncate">
          Giảng viên: <span className="font-semibold text-gray-700">{course?.instructor}</span>
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-base sm:text-lg font-bold text-green-600">
            {formatPriceVn(course?.price || 0)}
          </div>
          {course?.originalPrice && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              {formatPriceVn(course?.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <BookOpen size={18} />
            {course?.lessons} Lessons
          </div>
          <div className="flex items-center gap-1.5">
            <User size={18} />
            {course?.students} Students
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button asChild variant="outline" className="flex-1 text-xs sm:text-sm h-10">
            <Link to={`/courses/${course?.id}`}>Xem chi tiết</Link>
          </Button>

          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm h-10"
          >
            <ShoppingCart size={18} className="mr-2" />
            Thêm vào giỏ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;