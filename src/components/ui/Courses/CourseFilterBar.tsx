interface Props {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
}

import { Search } from "lucide-react";

export function CourseFilterBar(props: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      <div className="flex-1 relative md:min-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"                 
          lang="vi"                      
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          placeholder="Tìm khoá học..."
          className="w-full border border-gray-300 px-3 pl-10 py-1.5 sm:py-2 rounded text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
        />
      </div>

      <select
        value={props.category}
        onChange={(e) => props.setCategory(e.target.value)}
        className="flex-1 border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
      >
        <option value="">Danh mục</option>
        <option value="lập trình">Lập trình</option>
        <option value="marketing">Marketing</option>
        <option value="nhiếp ảnh">Nhiếp ảnh</option>
        <option value="thiết kế">Thiết kế</option>
        <option value="kinh doanh">Kinh doanh</option>
        <option value="ngoại ngữ">Ngoại ngữ</option>
      </select>
     <select
        value={props.level}
        onChange={(e) => props.setLevel(e.target.value)}
        className="flex-1 border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
      >
        <option value="">Level</option>
        <option value="Cơ Bản">Cơ Bản</option>
        <option value="Trung Bình">Trung Bình</option>
        <option value="Nâng Cao">Nâng Cao</option>
      </select>

      <select
        value={props.sort}
        onChange={(e) => props.setSort(e.target.value)}
        className="flex-1 border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
      >
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
      </select>
    </div>
  );
}
