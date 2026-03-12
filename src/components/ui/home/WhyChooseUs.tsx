import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { reasons } from "@/data/whychoose"



export default function WhyChooseUs() {
  return (
    <section className="py-20">

      <div className="container mx-auto space-y-12">

        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">
            Vì sao nên chọn chúng tôi
          </h2>
          <p className="text-muted-foreground">
            Trải nghiệm học tập được thiết kế tối ưu với nội dung chất lượng, giảng viên uy tín và lộ trình rõ ràng.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {reasons.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              viewport={{ once: false, amount: 0.4 }}
            >

              <Card className="h-full hover:shadow-lg transition">

                <CardContent className="p-6 space-y-2">

                  <h3 className="font-semibold text-lg text-green-700">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {item.description}
                  </p>

                </CardContent>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}