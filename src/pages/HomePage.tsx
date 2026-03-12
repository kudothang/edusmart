import HeroSection from "@/components/ui/home/HeroSection"
import StatsSection from "@/components/ui/home/StatsSection"
import FeaturedCourses from "@/components/ui/home/FeaturedCourse"
import WhyChooseUs from "@/components/ui/home/WhyChooseUs"
import ReviewSection from "@/components/ui/home/ReviewSection"

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20 pt-12 md:pt-16">

      <HeroSection />

      <StatsSection />

      <FeaturedCourses />

      <WhyChooseUs />

      <ReviewSection />

    </div>
  )
}