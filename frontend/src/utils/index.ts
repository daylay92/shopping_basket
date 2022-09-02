export function formatPrice() {
  return new Intl.NumberFormat("en", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "USD",
  });
}
