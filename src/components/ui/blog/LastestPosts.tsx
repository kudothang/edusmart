import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LatestPosts() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Bài viết mới nhất</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3 hover:opacity-75 cursor-pointer transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Latest post 1"
              className="w-12 h-12 rounded object-cover shrink-0"
            />
            <div className="text-sm text-foreground hover:text-emerald-600 transition-colors line-clamp-2">
              Hướng Dẫn Xây Dựng Phương Pháp Học Tập Hiệu Quả
            </div>
          </div>

          <Separator />

          <div className="flex gap-3 hover:opacity-75 cursor-pointer transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Latest post 2"
              className="w-12 h-12 rounded object-cover shrink-0"
            />
            <div className="text-sm text-foreground hover:text-emerald-600 transition-colors line-clamp-2">
              Khám Phá Môi Trường Học Tập Trong Thời Đại Số
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}