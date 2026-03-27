import { useState, useEffect } from "react";
import { useCourses } from "../hooks/useCourses";
import { useCourseFilter } from "../hooks/useCourseFilter";

import { CourseFilterBar } from "../components/ui/Courses/CourseFilterBar";
import { Pagination } from "../components/ui/pagination";
import { usePagination } from "../hooks/usePagnition";
import { useCourseFilterStore } from "../stores/courseFilterStore";
import { useSearchParams } from "react-router";
import { useFilterWithPagination } from "../hooks/useFilterAndPagination";
import Grid from "@/components/ui/Grid";
import CourseCard from "@/components/ui/Courses/CourseCard";

export default function CourseListPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data, isLoading } = useCourses();
  const { setSearch } = useCourseFilterStore();

  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [level, setLevel] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 8;

  const searchQuery = searchParam.get("search") || "";

  // Đồng bộ từ URL vào local input
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Cập nhật store + reset page
  useEffect(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput, setSearch]);

  // Update URL sau khi ngừng gõ 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParam(
        searchInput.trim()
          ? { search: searchInput.trim() }
          : {}
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchParam]);

  // Lọc khoá học
  const filteredCourses = useCourseFilter(data, {
    search: searchInput,
    category,
    sort,
    level,
  });

  // Phân trang
  const { paginatedItems, totalPages } = usePagination(
    filteredCourses,
    page,
    LIMIT
  );

  const onCategoryChange = useFilterWithPagination(
    setCategory,
    () => setPage(1)
  );
  const onLevelChange = useFilterWithPagination(
    setLevel,
    () => setPage(1)
  );
  const onSortChange = useFilterWithPagination(
    setSort,
    () => setPage(1)
  );

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl px-4">
         <h1 className="text-4xl font-bold text-gray-900 mb-2">Danh sách khoá học</h1>
        {/* Header Filter + Số lượng */}
        <div className="header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-5">
          <div className="w-full sm:w-auto">
            <CourseFilterBar
              search={searchInput}
              setSearch={setSearchInput}
              category={category}
              setCategory={onCategoryChange}
              level={level}
              setLevel={onLevelChange}
              sort={sort}
              setSort={onSortChange}
            />
          </div>

          {!isLoading && (
            <p className="text-xs sm:text-sm md:text-base text-gray-500 whitespace-nowrap">
              {filteredCourses.length} khoá học được tìm thấy
            </p>
          )}
        </div>

        <Grid cols="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedItems.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Grid>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>
    </section>
  );
}