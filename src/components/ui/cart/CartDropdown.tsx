import { X } from "lucide-react";
import { useCartStore } from "../../../stores/cartStore";
import {Button} from "antd";
import {  useNavigate } from "react-router";
import { formatPriceVn } from "../../../utils/Format";
interface Props {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: Props) {
  
  const { items, removeFromCart } = useCartStore();
  const { clearCart } = useCartStore();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose(); // đóng modal khi chuyển trang
    navigate("/cart-page");
  };
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-3 w-full sm:w-96 md:w-80 bg-white shadow-xl rounded-lg p-4 border z-50">
        <p className="text-center text-gray-500 text-sm">
          Giỏ hàng trống
        </p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-3 w-full sm:w-96 md:w-80 bg-white shadow-xl rounded-lg border z-50 max-h-[calc(100vh-100px)]">

      <div className="max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 sm:gap-3 p-2 sm:p-3 border-b hover:bg-gray-50 transition"
          >
            <img
              src={item.image}
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-medium line-clamp-2">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {formatPriceVn(item.price)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-xs sm:text-sm hover:text-red-700 transition shrink-0"
            >
              <X size={16} className="cursor-pointer"/>
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 sm:p-4 border-t bg-gray-50">
        <div className="flex justify-between mb-3 font-semibold text-sm">
          <span>Tổng cộng</span>
          <span className="text-emerald-600">{formatPriceVn(total)}</span>
        </div>
        <div className="flex flex-col gap-2">
            
            <Button color="green" variant="solid" className="w-full text-sm"
              onClick={handleCheckout} >
             Xem giỏ hàng
            </Button>
 
          <Button color="red" variant="solid" className="text-sm"
            onClick={clearCart} >
            Xoá tất cả
          </Button>
        </div>
        
      </div>
    </div>
  );
}