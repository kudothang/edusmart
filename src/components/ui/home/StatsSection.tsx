import { stats } from "@/data/stats"
import { Card, CardContent } from "@/components/ui/card"

export default function StatsSection() {
  return (
    <section className="container mx-auto">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((item) => (
          <Card
            key={item.label}
            className="border border-emerald-50 bg-white/80 shadow-sm"
          >

            <CardContent className="text-center py-6 space-y-1">

              <p className="text-3xl font-bold text-green-600">
                {item.value}
              </p>

              <p className="text-sm font-medium text-slate-700">
                {item.label}
              </p>

            </CardContent>

          </Card>
        ))}

      </div>

    </section>
  )
}