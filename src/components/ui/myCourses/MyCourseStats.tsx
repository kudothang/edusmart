import { type MyCourse } from "../../../types/index";
import { BookOpen, BarChart3, Medal, Clock } from "lucide-react";

interface Props {
  courses: MyCourse[];
}
interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}
export default function MyCourseStats({ courses }: Props) {
  const total = courses.length;
  const completed = courses.filter((c) => c.progress === 100).length;
  const learning = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const notStarted = courses.filter((c) => c.progress === 0).length;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat icon={<BookOpen />} label="Tổng số khóa học" value={total} />
      <Stat icon={<BarChart3 />} label="Đang học" value={learning} />
      <Stat icon={<Medal />} label="Đã hoàn thành" value={completed} />
      <Stat icon={<Clock />} label="Chưa bắt đầu" value={notStarted} />
    </div>
  );
}

function Stat({ icon, label, value }: StatProps) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>

      <div className="text-green-600">{icon}</div>
    </div>
  );
}