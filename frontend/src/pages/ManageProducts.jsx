import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    unit: "KG",
    mrp: "",
    sellingPrice: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // EDIT PRODUCT
  // -------------------------

  function handleEdit(product) {
    setEditingProduct({
      ...product,
    });

    setShowAddForm(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();

    try {
      const updatedProduct = {
        ...editingProduct,
        mrp: Number(editingProduct.mrp),
        sellingPrice: Number(editingProduct.sellingPrice),
        stock: Number(editingProduct.stock),
      };

      const savedProduct = await updateProduct(
        editingProduct.id,
        updatedProduct
      );

      setProducts(
        products.map((product) =>
          product.id === savedProduct.id
            ? savedProduct
            : product
        )
      );

      setEditingProduct(null);

      alert("Product updated successfully");

    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  // -------------------------
  // ADD PRODUCT
  // -------------------------

  function handleAddChange(event) {
    const { name, value } = event.target;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  }

  async function handleAddProduct(event) {
    event.preventDefault();

    try {
      const productToAdd = {
        ...newProduct,
        mrp: Number(newProduct.mrp),
        sellingPrice: Number(newProduct.sellingPrice),
        stock: Number(newProduct.stock),
      };

      const savedProduct = await addProduct(productToAdd);

      setProducts([
        ...products,
        savedProduct,
      ]);

      setNewProduct({
        name: "",
        category: "",
        unit: "KG",
        mrp: "",
        sellingPrice: "",
        stock: "",
        image: "",
      });

      setShowAddForm(false);

      alert("Product added successfully");

    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  }

  // -------------------------
  // DELETE PRODUCT
  // -------------------------

  async function handleDelete(product) {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(product.id);

      setProducts(
        products.filter(
          (item) => item.id !== product.id
        )
      );

      alert("Product deleted successfully");

    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  }

  // -------------------------
  // SEARCH
  // -------------------------

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-products-page">

      <h1>Manage Products</h1>

      <p>
        Add, edit and manage products in Sri Kumaran Store.
      </p>

      {/* ADD PRODUCT BUTTON */}

      <button
        type="button"
        onClick={() => {
          setShowAddForm(!showAddForm);
          setEditingProduct(null);
        }}
      >
        {showAddForm ? "Close Add Product" : "Add Product"}
      </button>

      {/* SEARCH */}

      <div className="manage-products-controls">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <p>
        Showing {filteredProducts.length} of{" "}
        {products.length} products
      </p>

      {/* ADD PRODUCT FORM */}

      {showAddForm && (

        <div className="add-product-section">

          <h2>Add Product</h2>

          <form onSubmit={handleAddProduct}>

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleAddChange}
              placeholder="Enter product name"
              required
            />

            <label>
              Category
            </label>

            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleAddChange}
              placeholder="Example: Pulses"
              required
            />

            <label>
              Unit
            </label>

            <select
              name="unit"
              value={newProduct.unit}
              onChange={handleAddChange}
            >
              <option value="KG">KG</option>
              <option value="LITRE">LITRE</option>
              <option value="PIECE">PIECE</option>
              <option value="PACK">PACK</option>
              <option value="BOTTLE">BOTTLE</option>
              <option value="BOX">BOX</option>
              <option value="DOZEN">DOZEN</option>
              <option value="JAR">JAR</option>
            </select>

            <label>
              MRP
            </label>

            <input
              type="number"
              name="mrp"
              value={newProduct.mrp}
              onChange={handleAddChange}
              min="0"
              step="0.01"
              placeholder="Enter MRP"
              required
            />

            <label>
              Selling Price
            </label>

            <input
              type="number"
              name="sellingPrice"
              value={newProduct.sellingPrice}
              onChange={handleAddChange}
              min="0"
              step="0.01"
              placeholder="Enter selling price"
              required
            />

            <label>
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleAddChange}
              min="0"
              step="0.001"
              placeholder="Enter stock quantity"
              required
            />

            <label>
              Image Path
            </label>

            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleAddChange}
              placeholder="/products/product-name.png"
            />

            <button type="submit">
              Add Product
            </button>

          </form>

        </div>

      )}

      {/* PRODUCT LIST */}

      {loading ? (
        <p>Loading products...</p>
      ) : (

        <div className="manage-products-list">

          {filteredProducts.map((product) => (

            <div
              className="manage-product-row"
              key={product.id}
            >

              <div>

                <strong>{product.name}</strong>

                <p>
                  Category: {product.category}
                </p>

                <p>
                  Unit: {product.unit}
                </p>

              </div>

              <div>

                <p>
                  MRP: ₹{product.mrp}
                </p>

                <p>
                  Selling Price: ₹{product.sellingPrice}
                </p>

                <p>
                  Stock: {product.stock} {product.unit}
                </p>

              </div>

              <div>

                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* EDIT FORM */}

      {editingProduct && (

        <div className="edit-product-section">

          <h2>Edit Product</h2>

          <form onSubmit={handleUpdate}>

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={handleChange}
              required
            />

            <label>
              Category
            </label>

            <input
              type="text"
              name="category"
              value={editingProduct.category}
              onChange={handleChange}
              required
            />

            <label>
              Unit
            </label>

            <input
              type="text"
              name="unit"
              value={editingProduct.unit}
              onChange={handleChange}
              required
            />

            <label>
              MRP
            </label>

            <input
              type="number"
              name="mrp"
              value={editingProduct.mrp}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <label>
              Selling Price
            </label>

            <input
              type="number"
              name="sellingPrice"
              value={editingProduct.sellingPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <label>
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={editingProduct.stock}
              onChange={handleChange}
              min="0"
              step="0.001"
              required
            />

            <label>
              Image Path
            </label>

            <input
              type="text"
              name="image"
              value={editingProduct.image}
              onChange={handleChange}
            />

            <button type="submit">
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>

          </form>

        </div>

      )}

      {filteredProducts.length === 0 && !loading && (
        <p>No products found.</p>
      )}

    </div>
  );
}

export default ManageProducts;