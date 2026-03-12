import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCourses } from "../../../hooks/useCourses";
import { useCourseSuggestions } from "../../../hooks/useCourseFilter";
import { useCourseFilterStore } from "../../../stores/courseFilterStore";
import { Search, X } from "lucide-react";
import { formatPriceVn } from "../../../utils/Format";
import { useState } from "react";



const HeaderSearch = () => {
  const { data = [] } = useCourses();
  const { setSearch, resetSearch } = useCourseFilterStore();  
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Reset search khi không ở trang courses
  useEffect(() => {
    if (!pathname.includes("/courses")) {
      resetSearch();
    }
  }, [pathname, resetSearch]);

  // Get suggestions dựa vào keyword gõ ra
  const suggestions = useCourseSuggestions(data);

  const submitSearch = (searchKeyword?: string) => {
    const query = searchKeyword || keyword;
    
    if (!query.trim()) return;

    // Navigate tới course page với search param
    navigate(`/courses?search=${encodeURIComponent(query)}`);
    
    setKeyword("");
   
  };

  return (
    <div>     {/* Search desktop with suggestions */}
      {  <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4">
        <div ref={searchRef} className="relative w-full">
          <form onSubmit={(e) => {
            e.preventDefault();
            submitSearch();
          }}>
            <div className="flex w-100 items-center border border-gray-300 rounded-full px-4 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
              <Search size={18}
                className="text-gray-500 cursor-pointer"
                onClick={() => submitSearch()}
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  const value = e.target.value;
                  setKeyword(value);
                  setSearch(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitSearch();
                  }
                }}
                placeholder="Tìm khóa học, giảng viên..."
                className="ml-3 outline-none text-sm w-full bg-transparent"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword("")}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="ml-2 p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors cursor-pointer"
                title="Tìm kiếm khóa học"
              >
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Search Suggestions Dropdown */}

          {keyword && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-green-400 rounded-xl shadow-lg mt-2 z-50 overflow-hidden">
              {suggestions.map((course) => (
                <li
                  key={course.id}
                  onClick={() => {
                    navigate(`/courses/${course.id}`);
                    setKeyword("");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  {/* IMAGE */}
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-12 h-12 rounded object-cover shrink-0"
                  />

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {course.instructor}
                    </p>
                  </div>

                  {/* PRICE */}
                  <span className="text-sm font-semibold text-green-400 whitespace-nowrap">
                    {formatPriceVn(course.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
        </div>
      </div>}
      </div>
      
  )
}

export default HeaderSearch