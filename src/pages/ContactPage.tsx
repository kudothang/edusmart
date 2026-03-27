
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import ContactForm from "../components/ui/contact/ContactForm"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-3">

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Chúng tôi luôn sẵn sàng
                <br />
                lắng nghe bạn!
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-md">
                Nếu bạn có thắc mắc về khóa học, thanh toán hoặc hợp tác, hãy liên hệ với chúng tôi.
                Đội ngũ tư vấn sẽ phản hồi trong thời gian sớm nhất.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Địa chỉ
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <p className="text-slate-700">
                    Tầng 4, toà nhà SOFTECH CORPORATION, 24 Lê Thánh Tôn, Phường Hải Châu, TP Đà Nẵng
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Email
                </p>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <p className="text-slate-700">kudothang@gmail.com</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Điện thoại
                </p>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <p className="text-slate-700">0889846450 (8:00 - 21:00, tất cả các ngày)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-500">
                Kết nối với chúng tôi
              </p>
              <div className="flex items-center gap-3">
             
               <Button variant="outline" size="icon" className="cursor-pointer">
                  <Facebook />
                </Button>
               <Button variant="outline" size="icon"className="cursor-pointer">
                  <Twitter />
                </Button>
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <Linkedin />
                </Button>
                  
                
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-semibold">Gửi tin nhắn cho chúng tôi</h2>
              <p className="text-sm text-muted-foreground">
                Điền đầy đủ thông tin dưới đây để chúng tôi có thể hỗ trợ bạn tốt hơn.
              </p>
            </div>

            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}

