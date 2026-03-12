import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Input, Button, Card, Radio, Row, Col, message } from "antd"

import { checkoutSchema } from "../schemas/schemaCheckout"
import { useCartStore } from "../stores/cartStore"
import { formatPriceVn } from "../utils/Format"
import { X } from "lucide-react"

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  address: string
  paymentMethod: string
}

export default function CheckoutPage() {
  const { items, clearCart, removeFromCart } = useCartStore()

  const total = items.reduce((sum, c) => sum + c.price, 0)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, reset,
  } = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema),
    mode: "onChange"
  })

  const onSubmit = () => {
    message.success("Thanh toán thành công!")
    reset()
    clearCart()
  }

  return (
    <Row gutter={24} className="p-8 max-w-7xl mx-auto">

      {/* FORM */}
      <Col span={12} >
        <Card title="Thông Tin Thanh Toán" className="shadow-md">
          <div className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label>Họ và tên</label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Huỳnh Quốc Thắng" />
                )}
              />

              {errors.fullName && (
                <p className="text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div >
              <label>Email</label>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="email@gmail.com" />
                )}
              />

              {errors.email && (
                <p className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div >
              <label>Số điện thoại</label>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="0901234567" />
                )}
              />

              {errors.phone && (
                <p className="text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* ADDRESS */}
            <div >
              <label>Địa chỉ</label>

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Đà Nẵng" />
                )}
              />

              {errors.address && (
                <p className="text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* PAYMENT */}
            <div >
              <label>Phương thức thanh toán  </label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="cod">
                      Thanh toán khi nhận hàng
                    </Radio>

                    <Radio value="bank">
                      Chuyển khoản
                    </Radio>
                  </Radio.Group>
                )}
              />

              {errors.paymentMethod && (
                <p className="text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
            <div className="mt-6 text-center">
              <Button
                variant="solid"
                color="green"
                size="large"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                Thanh toán
              </Button>
            </div>

          </div>
        </Card>
      </Col>


      {/* THÔNG TIN ĐƠN HÀNG CẦN THANH TOÁN */}
      <Col span={12}>
        <Card title="Đơn Hàng" className="shadow-md">
          {items.map((course) => (
            <Row key={course.id} align="middle" className="mb-3">
              <Col span={18}>
                <span>{course.title}</span>
              </Col>

              <Col span={4} >
                <span>{formatPriceVn(course.price)}</span>
              </Col>

              <Col span={2} >
                <button
                  onClick={() => removeFromCart(course.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X />
                </button>
              </Col>
            </Row>
          ))}
          <Row
            justify="space-between"
            className="font-bold pt-5 mt-5 border-t-2 border-black-100"
          >
            <Col span={18}>Tổng</Col>
            <Col span={6}>{formatPriceVn(total)}</Col>
          </Row>

        </Card>
      </Col>

    </Row>
  )
}