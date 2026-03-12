import { Button } from "antd";
import { useCartStore } from "../stores/cartStore";
import { formatPriceVn } from "../utils/Format";
import { Link } from "react-router";

export default function CartPage() {
  const { items, removeFromCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-4xl sm:max-w-5xl px-4">
         <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2"> Giỏ hàng của bạn</h1>
          <p className="text-gray-600">
           Nơi lưu trữ các khóa học bạn đã chọn mua. Hãy kiểm tra lại trước khi thanh toán!
          </p>
        </div>
      {items.length === 0 && (
        <p>Chưa có khóa học trong giỏ hàng</p>
      )}

      <div className="space-y-4">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={item.image}
              className="w-32 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.instructor}
              </p>
            </div>

            <p className="font-bold text-red-500">
              {formatPriceVn(item.price)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Xóa
            </button>
          </div>
        ))}

      </div>

      {items.length > 0 && (
        <div className="mt-6 text-right font-bold text-lg">
          {formatPriceVn(total)}
         <div className="mt-6 text-right">
          <Link to ="/checkout">
          <Button variant="solid" color="green" size="large">
            Thanh toán
          </Button>
        </Link>
         </div>
        </div>
      )}
      {items.length ===0 && (
        <div className="mt-6 flex items-center justify-center gap-4 ">
          <div>
          <Link to ="/courses">
           <Button variant="solid" color="green" size="large">
            Mua khoá học mới tại đây
           </Button>
          </Link>
          </div>
          <div>
          <Link to ="/courses">
           <Button variant="solid" color="default" size="large">
            Tới trang khoá học đã mua
           </Button>
          </Link>
          </div>
        </div> 
      )}
  
    </div>
    </section>
  );
}