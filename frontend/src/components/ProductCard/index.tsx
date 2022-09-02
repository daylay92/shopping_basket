import { ProductType } from "../../types";
import { formatPrice } from "../../utils";

interface IProductCard {
  product: ProductType;
  handleAddToCart: () => {};
}
export default function ProductCard({ product, handleAddToCart }: IProductCard) {
  const { name, price, imageUrl } = product;

  return (
    <div className="product">
      <div className="img-holder">
        <img src={imageUrl} alt="product" className="product-image" />
      </div>

      <div className="product-name">{name}</div>
      <div className="product-price">From {formatPrice().format(price)}</div>
      <button className="btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
