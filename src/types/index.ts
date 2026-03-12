//type cho các bài học
export interface CurriculumItem {
  title: string;
  duration: string;
  type: string;
}
//type cho khoá học
export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  price: number;
  originalPrice: number;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  image: string;
  badge: string;
  level: string;
  language: string;
  certificate: boolean;
  lastUpdated?: string;
  description: string;
  whatYouLearn: string[];
  curriculum: CurriculumItem[];
  requirements: string[];
}
//type cho danh mục trong khoá học 
export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}
// type cho khoá học của tôi
export interface MyCourse {
  id: string;
  title: string;
  image:string;
  instructor: string;
  category: string;
  hasCertificate: boolean;
  lessons: number;
  duration: string;
  progress: number;
  purchasedDate: string;
  lastAccess: string;
}
// type cho giỏ hàng
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  instructor: string;
}
//type cho bài viết blog
export interface Blog {
  id: string
  title: string
  category: string
  image: string
  description: string
  createdAt: string
  comments: number
}
//type cho user: login và register
export interface User {
  id?: string
  fullName: string
  email: string
  password: string
  role: string
  phone: string
  avatar: string
  createdAt: string
}
// type cho trang home
export interface Stat {
  label: string
  value: string
}

export interface FeaturedCourse {
  id: number
  title: string
  instructor: string
  image: string
}

export interface Review {
  name: string
  comment: string
  avatar: string
}
export interface Reason {
  title: string
  description: string
}
export interface ContactForm {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}
