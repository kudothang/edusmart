import { useQuery } from "@tanstack/react-query"
import { courseApi } from "@/api/courseApi"
import { type Course } from "@/types/index"

export function useFeaturedCourses() {
  return useQuery<Course[]>({
    queryKey: ["featuredCourses"],
    queryFn: async () => {
      const courses = await courseApi.getAll()

      return courses.slice(0, 6)
    }
  })
}