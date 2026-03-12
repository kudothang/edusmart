import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagnition";
import Grid from "@/components/ui/Grid";
import MyCourseCard from "@/components/ui/myCourses/MyCourseCard";
import { mycoursedata } from "@/data/myCoursedata";

export default function MyCoursesPage() {
 
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const LIMIT = 8;
  // Lọc theo tab
  const filtered = mycoursedata.filter((course) => {
    if (tab === "in-progress") return course.progress > 0 && course.progress < 100;
    if (tab === "completed") return course.progress === 100;
    if (tab === "not-started") return course.progress === 0;
    return true; // "tab all "
  });
  const { paginatedItems, totalPages } = usePagination(
    filtered,
    page,
    LIMIT
  );
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Khoá học đã mua</h1>
        <Tabs value={tab} onValueChange={(value) => {
          setTab(value);
          setPage(1); // reset page khi đổi tab
        }}>
          <TabsList className="mb-8 justify-center">
            <TabsTrigger value="all" className="cursor-pointer">Tất cả</TabsTrigger>
            <TabsTrigger value="in-progress" className="cursor-pointer">Đang học</TabsTrigger>
            <TabsTrigger value="completed" className="cursor-pointer">Đã hoàn thành</TabsTrigger>
            <TabsTrigger value="not-started" className="cursor-pointer">Chưa bắt đầu</TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            <Grid cols="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedItems.map((course) => (
                <MyCourseCard key={course.id} course={course} />
              ))}
            </Grid>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}