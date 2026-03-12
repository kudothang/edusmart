import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">

      <div className="relative container mx-auto grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="inline-flex items-center rounded-sm bg-white/70 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            Nền tảng e-learning hiện đại
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Nâng cấp kỹ năng
            <span className="text-green-600"> mỗi ngày</span>
          </h1>

          <p className="mt-6 text-muted-foreground text-lg max-w-xl">
            Hơn 300+ khóa học giúp bạn phát triển sự nghiệp
            trong lập trình, marketing và thiết kế.
          </p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          > 
           <Link to={"/courses"}>
            <Button className="bg-green-600 hover:bg-green-700 cursor-pointer ">
              Khám phá khóa học
            </Button>
          </Link>
          <Link to={"/contact"}>
            <Button variant="outline" className="cursor-pointer">
              Tìm hiểu thêm
            </Button>
          </Link>
          </motion.div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
          className="rounded-2xl shadow-xl ring-1 ring-black/5"
        />
      </div>

    </section>
  )
}