
import { type MyCourse } from "../../../types/index";
import { Progress } from "../progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { Button } from "../button";
import { AlarmClock, Calendar } from "lucide-react";

export default function MyCourseCard({ course }: { course: MyCourse }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md shadow-black/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 w-full">
      
      <img
        src={course.image}
        alt={course.title}
        className="h-40 w-full object-cover"
      />

      <CardHeader>
        <CardTitle className="text-lg">
          {course.title}
        </CardTitle>

        <Badge variant="secondary">
          {course.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">

        <div className="flex gap-2 items-center"> <Calendar /> <p>Ngày mua: {course.purchasedDate}</p> </div>

        <div className="flex gap-2 items-center"> <AlarmClock /> <p>Thời lượng: {course.duration}</p> </div>

        <div>
          <p>Tiến trình</p>
          <Progress value={course.progress} />
        </div>

      </CardContent>

      <CardFooter className="flex justify-between">

        {course.hasCertificate && (
          <Badge className="bg-green-600">
            Có chứng chỉ
          </Badge>
        )}

        <Button size="sm">
          Học tiếp
        </Button>

      </CardFooter>

    </Card>
  );
}