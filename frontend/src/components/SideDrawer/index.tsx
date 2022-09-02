/* eslint-disable jsx-a11y/no-onchange */
import { CartType } from "../../types";
import { formatPrice } from "../../utils";

interface ISideDrawer {
  visible: boolean;
  toggleSideDrawer: () => {};
  cart: CartType[];
  handleQuantity: (v: number, i: number) => {};
  getCartPriceTotal: () => {};
  removeCartItem: (i: number) => {};
  handleRemovedItemsCheckout: () => {};
  checkoutLoading: boolean;
  successStatus: boolean;
}

export default function SideDrawer({
  visible,
  toggleSideDrawer,
  cart,
  handleQuantity,
  getCartPriceTotal,
  removeCartItem,
  handleRemovedItemsCheckout,
  checkoutLoading,
  successStatus,
}: ISideDrawer) {
  return (
    <div className={`side-drawer ${visible ? "visible" : ""}`}>
      <div className="d-flex">
        <button className="cart-toggle-btn" type="button" onClick={toggleSideDrawer}>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
            <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"></path>
          </svg>
        </button>
        <p className="my-cart">Cart</p>
      </div>

      <div className="cart">
        {cart.length < 1 && !successStatus && (
          <div className="cart-text">There are no items in your cart.</div>
        )}
        {cart.length < 1 && successStatus && (
          <p className="text-green">Thank you for the purchase!</p>
        )}
        {Boolean(cart.length) &&
          cart?.map((ct) => {
            return (
              <div key={ct.id} className="cart-item">
                <button className="close-icon" onClick={() => removeCartItem(ct.id)}>
                  X
                </button>
                <div className="item-title">{ct.title}</div>

                <div className="item-img">
                  <img src={ct.imageUrl} alt="cart-img" className="cart-img" />
                </div>
                <div className="d-flex">
                  <div className="item-quantity-section">
                    <button onClick={() => handleQuantity(ct.id, ct.quantity - 1)}>-</button>
                    <span>{ct.quantity}</span>
                    <button onClick={() => handleQuantity(ct.id, ct.quantity + 1)}>+</button>
                  </div>
                  <div className="item-amount">{formatPrice().format(ct.quantity * ct.price)}</div>
                </div>
              </div>
            );
          })}
      </div>

      {Boolean(cart.length) && (
        <div className="check-out-section">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>{formatPrice().format(getCartPriceTotal() as number)}</span>
          </div>
          <button className="checkout" onClick={handleRemovedItemsCheckout}>
            {checkoutLoading ? "pending..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
