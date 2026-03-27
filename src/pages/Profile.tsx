import { useAuthStore } from "@/stores/authStore"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { updateProfileSchema } from "../schemas/schemaAuth"

interface ProfileForm {
  fullName: string
  phone: string
}

export default function ProfilePage() {

  const { user, updateProfile } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileForm>({
    resolver: yupResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    },
  })

  if (!user) {
    return (
      <p className="text-center py-10">
        Chưa đăng nhập
      </p>
    )
  }

  const onSubmit = (data: ProfileForm) => {

    updateProfile({
      fullName: data.fullName,
      phone: data.phone,
    })

    alert("Cập nhật thông tin thành công")
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <Card>

        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Avatar */}

          <div className="flex items-center gap-4">

            <Avatar className="h-16 w-16">

              <AvatarImage src={user.avatar} />

              <AvatarFallback>
                {user.fullName.charAt(0)}
              </AvatarFallback>

            </Avatar>

            <div>

              <p className="font-semibold text-lg">
                {user.fullName}
              </p>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <p className="text-muted-foreground">
                Ngày tham gia: {user.createdAt.split("T")[0]}
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4"
          >

            {/* FullName */}

            <div>

              <label className="text-sm">
                Họ tên
              </label>

              <Input
                {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="text-sm">
                Email
              </label>

              <Input
                value={user.email}
                disabled
              />

            </div>

            {/* Phone */}

            <div>

              <label className="text-sm">
                Số điện thoại
              </label>

              <Input
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}

            </div>

            <div className="md:col-span-2">

              <Button
                type="submit"
                className="w-full"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting
                  ? "Đang cập nhật..."
                  : "Cập nhật thông tin"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}