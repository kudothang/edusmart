import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogCategories() {
  const categories = [
    "Child Development",
    "Computer Engineering",
    "Learning",
    "Nutrition",
    "Science",
    "Technology"
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Danh mục bài viết</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {categories.map((cat) => (
            <li
              key={cat}
              className="text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors py-1"
            >
              {cat}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}