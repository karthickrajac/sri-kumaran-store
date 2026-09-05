import { useEffect, useState } from "react";
import { getProducts, createSale } from "../services/api";
import "./Billing.css";

function Billing() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function selectProduct(product) {
    setSelectedProduct(product);
    setSearch(product.name);
    setQuantity("");
  }

  function addToBill() {
    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const enteredQuantity = Number(quantity);

    if (!enteredQuantity || enteredQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (enteredQuantity > selectedProduct.stock) {
      alert("Quantity is greater than available stock.");
      return;
    }

    const existingItem = cart.find(
      (item) => item.product.id === selectedProduct.id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + enteredQuantity;

      if (newQuantity > selectedProduct.stock) {
        alert("Total quantity is greater than available stock.");
        return;
      }

      setCart(
        cart.map((item) =>
          item.product.id === selectedProduct.id
            ? {
                ...item,
                quantity: newQuantity,
                totalPrice: newQuantity * item.unitPrice,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          product: selectedProduct,
          quantity: enteredQuantity,
          unitPrice: selectedProduct.sellingPrice,
          totalPrice: enteredQuantity * selectedProduct.sellingPrice,
        },
      ]);
    }

    setQuantity("");
  }

  function increaseQuantity(productId) {
    setCart(
      cart.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        const newQuantity = item.quantity + 0.1;

        if (newQuantity > item.product.stock) {
          alert("Cannot exceed available stock.");
          return item;
        }

        return {
          ...item,
          quantity: Number(newQuantity.toFixed(2)),
          totalPrice: Number(
            (newQuantity * item.unitPrice).toFixed(2)
          ),
        };
      })
    );
  }

  function decreaseQuantity(productId) {
    setCart(
      cart.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        const newQuantity = item.quantity - 0.1;

        if (newQuantity <= 0) {
          return null;
        }

        return {
          ...item,
          quantity: Number(newQuantity.toFixed(2)),
          totalPrice: Number(
            (newQuantity * item.unitPrice).toFixed(2)
          ),
        };
      }).filter(Boolean)
    );
  }

  function removeFromBill(productId) {
    setCart(cart.filter((item) => item.product.id !== productId));
  }

  const billTotal = cart.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Please add at least one product to the bill.");
      return;
    }

    setCheckoutLoading(true);

    try {
      const saleData = {
        paymentMethod: paymentMethod,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const sale = await createSale(saleData);

      alert(
        `Bill created successfully!\n\nBill ID: ${sale.id}\nTotal: ₹${sale.totalAmount.toFixed(2)}`
      );

      setCart([]);
      setSelectedProduct(null);
      setSearch("");
      setQuantity("");

      await loadProducts();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error.message);
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="billing-page">
      <div className="billing-header">
        <h1>Billing</h1>
        <p>Create a new customer bill</p>
      </div>

      <div className="billing-container">
        <div className="billing-product-section">
          <h2>Add Products</h2>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedProduct(null);
            }}
            className="billing-search"
          />

          {search && !selectedProduct && (
            <div className="billing-product-list">
              {filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    className="billing-product-option"
                    onClick={() => selectProduct(product)}
                  >
                    <span>{product.name}</span>

                    <span>
                      ₹{product.sellingPrice} / {product.unit}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}

          {selectedProduct && (
            <div className="selected-product">
              <h3>{selectedProduct.name}</h3>

              <p>
                Price: ₹{selectedProduct.sellingPrice} /{" "}
                {selectedProduct.unit}
              </p>

              <p>
                Available Stock: {selectedProduct.stock}{" "}
                {selectedProduct.unit}
              </p>

              <div className="quantity-row">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder={`Quantity in ${selectedProduct.unit}`}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <button onClick={addToBill}>
                  Add to Bill
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="current-bill">
          <h2>Current Bill</h2>

          {cart.length === 0 ? (
            <p className="empty-bill">
              No products added yet.
            </p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bill-item"
                >
                  <div className="bill-item-info">
                    <strong>{item.product.name}</strong>

                    <p>
                      ₹{item.unitPrice} / {item.product.unit}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity} {item.product.unit}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.product.id)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bill-item-right">
                    <strong>
                      ₹{item.totalPrice.toFixed(2)}
                    </strong>

                    <button
                      onClick={() =>
                        removeFromBill(item.product.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="payment-section">
                <label>Payment Method</label>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                </select>
              </div>

              <div className="bill-total">
                <span>Total</span>

                <strong>
                  ₹{billTotal.toFixed(2)}
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Billing;