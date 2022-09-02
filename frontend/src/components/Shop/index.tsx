import { ProductType } from "../../types";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";

interface IShop {
  products: ProductType[];
  handleAddToCart: (p: ProductType) => {};
  loading: boolean;
  error: Record<string, string>;
}

export default function Shop({ products, handleAddToCart, loading, error }: IShop) {
  return (
    <div className="shop" id="shop">
      <div className={`products ${loading || error ? "d-flex" : ""}`}>
        {error && (
          <div className={`${error ? "error" : ""}`}>
            <div>
              An Unknown Error occured!. <br /> Kindly refresh the page
            </div>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={() => handleAddToCart(product)}
            />
          ))
        )}
      </div>
    </div>
  );
}
