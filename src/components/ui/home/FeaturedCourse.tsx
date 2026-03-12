import { useFeaturedCourses } from "@/hooks/useFeaturedCourse"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedCourses() {

  const { data: courses, isLoading } = useFeaturedCourses()

  if (isLoading) {
    return (
      <section className="container mx-auto space-y-4">
        <div className="h-6 w-48 rounded-md bg-muted animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-52 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto space-y-8">

      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Khoá học nổi bật
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Lựa chọn những khoá học được nhiều học viên quan tâm,
          phù hợp cho cả người mới bắt đầu và đã có kinh nghiệm.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {courses?.map(course => (

          <Card
            key={course.id}
            className="group overflow-hidden border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-transform duration-200"
          >

            <img
              src={course.image}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <CardContent className="pt-4">

              <h3 className="font-semibold line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {course.instructor}
              </p>

            </CardContent>

          </Card>

        ))}

      </div>

    </section>
  )
}