import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogList from "../components/ui/blog/BlogList";
import BlogSidebar from "../components/ui/blog/BlogSidebar";
import { Pagination } from "../components/ui/pagination";
import { usePagination } from "../hooks/usePagnition";
import {blogs} from "../data/blogs"

const LIMIT = 5;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);


  const { paginatedItems, totalPages } = usePagination(
    blogs || [],
    page,
    LIMIT
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-6xl sm:max-w-5xl px-4">
        <div className="mb-3">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600">
            Khám phá những bài viết hay về giáo dục và phát triển kỹ năng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BlogList blogs={paginatedItems} />
          </div>

          <div className="hidden lg:block">
            <BlogSidebar />
          </div>
        </div>

        <div className="mt-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>

        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full p-3 h-auto w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg animate-fade-in"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  )
}