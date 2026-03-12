
import LatestPosts from "./LastestPosts"
import BlogCategories from "./BlogCategories"
import BlogTags from "./BlogTags"

export default function BlogSidebar() {
  return (
    <div className="space-y-8">

      <LatestPosts />

      <BlogCategories />

      <BlogTags />

    </div>
  )
}