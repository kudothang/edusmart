import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { reviews } from "@/data/reviews"

export default function ReviewSection() {
  return (
    <section className="container mx-auto space-y-12">

      <h2 className="text-3xl font-bold text-center">
        Học viên nói gì về chúng tôi
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {reviews.map((review, index) => (

          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            viewport={{ once: false, amount: 0.4 }}
          >

            <Card className="hover:shadow-lg transition">

              <CardContent className="p-6 space-y-4">

                <div className="flex items-center gap-3">

                  <Avatar>
                    <AvatarImage src={review.avatar} />
                  </Avatar>

                  <p className="font-medium">
                    {review.name}
                  </p>

                </div>

                <p className="text-muted-foreground">
                  "{review.comment}"
                </p>

              </CardContent>

            </Card>

          </motion.div>

        ))}

      </div>

    </section>
  )
}