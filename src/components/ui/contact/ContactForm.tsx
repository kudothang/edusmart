
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { contactSchema } from "@/schemas/schemaContact"
import { message } from "antd"
import { type ContactForm } from "@/types/index"
import { Card, CardContent } from "../card"
import { Field, FieldError, FieldLabel } from "../field"

export default function ContactForm() {


  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting }
  } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  })
  const onSubmit = async (data: ContactForm) => {

    await new Promise((r) => setTimeout(r, 1000))

    console.log(data)

    message.success("Gửi thành công!")

    reset()
  }
  return (
    <Card>
      <CardContent className="p-6">

        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-5" >
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Họ và tên</FieldLabel>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Tên của bạn" {...field} />
                )}
              />
              <FieldError>
                {errors.fullName?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input placeholder="kudo@gmail.com" {...field} />
                )}
              />
              <FieldError>
                {errors.email?.message}
              </FieldError>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field>

              <FieldLabel>Số điện thoại</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input placeholder="0123 456 789" {...field} />
                )}
              />
              <FieldError>
                {errors.phone?.message}
              </FieldError>

            </Field>
            <Field>

              <FieldLabel>Chủ đề</FieldLabel>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Hỗ trợ khóa học, thanh toán..."
                    {...field}
                  />
                )}
              />

              <FieldError>
                {errors.subject?.message}
              </FieldError>

            </Field>
          </div>
          <Field>

            <FieldLabel>Nội dung</FieldLabel>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  rows={4}
                  placeholder="Mô tả chi tiết câu hỏi..."
                  {...field}
                />
              )}
            />

            <FieldError>
              {errors.message?.message}
            </FieldError>

          </Field>

          <Button
            type="submit"
            disabled={isSubmitting|| !isValid}
            className="w-full bg-green-500 hover:bg-green-600 cursor-pointer" 
          >
            {isSubmitting ? "Đang gửi..." : "Gửi liên hệ"}
          </Button>

        </form>

      </CardContent>

    </Card>
  )
}

