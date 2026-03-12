interface Props {
  active: string;
  setActive: (v: string) => void;
  stats: {
    total: number;
    learning: number;
    completed: number;
    notStarted: number;
  };
}

export default function MyCourseTags({ active, setActive, stats }: Props) {
  const tags = [
    { key: "all", label: `Tất cả (${stats.total})` },
    { key: "learning", label: `Đang học (${stats.learning})` },
    { key: "completed", label: `Đã hoàn thành (${stats.completed})` },
    { key: "notStarted", label: `Chưa bắt đầu (${stats.notStarted})` },
  ];

  return (
    <div className="flex gap-3">
      {tags.map((tag) => (
        <button
          key={tag.key}
          onClick={() => setActive(tag.key)}
          className={`px-4 py-2 rounded-lg text-sm ${
            active === tag.key
              ? "bg-green-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}