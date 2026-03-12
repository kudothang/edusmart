export function formatPriceVn(price?: number) {
  return price ? price.toLocaleString("vi-VN") + "đ" : "";
}
