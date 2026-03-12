import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Blog } from "../../../types/index"

interface Props {
  blog: Blog
}

export default function BlogCard({ blog }: Props) {
  return (
    <Card className="overflow-hidden mb-8 hover:shadow-lg transition-shadow">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover"
      />

      <CardContent className="p-6">
        <Badge variant="secondary" className="mb-3">
          {blog.category}
        </Badge>

        <h2 className="text-xl font-semibold mt-2 mb-2 line-clamp-2 hover:text-emerald-600 transition-colors">
          {blog.title}
        </h2>

        <div className="text-sm text-muted-foreground mb-3">
          {blog.createdAt} • {blog.comments} Comments
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.description}
        </p>

        <Button className="bg-emerald-600 hover:bg-emerald-700">
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  )
}