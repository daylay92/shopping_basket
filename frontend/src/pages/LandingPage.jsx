import axios from "axios";
import { useEffect, useState } from "react";
import BackDrop from "../components/BackDrop";
import MiniBanner from "../components/MiniBanner";
import Navbar from "../components/Navbar";
import Shop from "../components/Shop";
import SideDrawer from "../components/SideDrawer";

const BASE_URL = "http://localhost:4500/api/v1";

export default function LandingPage() {
  const [sideDrawerVisibility, setSideDrawerVisibility] = useState(false);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [removeCartItemIds, setRemovedCartItemIds] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data?.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoadingProducts(false);
      }
    }

    getProducts();
  }, []);

  function toggleSideDrawer() {
    setSideDrawerVisibility(!sideDrawerVisibility);
  }

  function addToCart(product) {
    const updatedCart = [...cart];
    const foundItem = updatedCart.find((item) => item.id === product.id);
    if (foundItem) {
      handleQuantity(foundItem.id, foundItem.quantity + 1);
      return setSideDrawerVisibility(true);
    }
    setRemovedCartItemIds(cart.filter((c) => c._id === product._id).map((item) => item.id));
    updatedCart.push({ quantity: 1, ...product });
    setSideDrawerVisibility(true);
    setCart([...updatedCart]);
  }

  function handleQuantity(id, quantity) {
    if (quantity === 0) {
      return removeCartItem(id);
    }

    const cartItem = cart.find((item) => item.id === id);
    cartItem.quantity = quantity;
    setCart([...cart]);
  }

  function getCartPriceTotal() {
    return cart.reduce((acc, element) => acc + +element.quantity * +element.price, 0);
  }

  function removeCartItem(id) {
    setRemovedCartItemIds([...removeCartItemIds, id]);
    setCart(cart.filter((item) => item.id !== id));
  }

  function getTotalItemsInCart() {
    return cart.reduce((acc, element) => acc + element.quantity, 0);
  }

  async function handleRemovedItemsCheckout() {
    try {
      if (removeCartItemIds.length) {
        setCheckoutLoading(true);
        await axios.post(`${BASE_URL}/removed-products`, {
          productIds: removeCartItemIds,
        });
      }
      setRemovedCartItemIds([]);
      setCart([]);
      setSuccessStatus(true);
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <Navbar toggleSideDrawer={toggleSideDrawer} getTotalItemsInCart={getTotalItemsInCart} />
      <SideDrawer
        visible={sideDrawerVisibility}
        toggleSideDrawer={toggleSideDrawer}
        cart={cart}
        handleQuantity={handleQuantity}
        getCartPriceTotal={getCartPriceTotal}
        removeCartItem={removeCartItem}
        handleRemovedItemsCheckout={handleRemovedItemsCheckout}
        checkoutLoading={checkoutLoading}
        successStatus={successStatus}
      />
      <BackDrop toggleSideDrawer={toggleSideDrawer} sideDrawerVisibility={sideDrawerVisibility} />
      <MiniBanner />
      <Shop
        products={products.data}
        handleAddToCart={addToCart}
        loading={loadingProducts}
        error={error}
      />
    </>
  );
}
