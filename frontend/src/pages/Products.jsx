import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Unable to load products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">

      <h1>Our Products</h1>

      <p>
        Quality products for your everyday needs at reasonable prices.
      </p>

      {/* Search and Category */}
      <div className="product-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Product Count */}
      <p className="product-count">
        Showing {filteredProducts.length} products
      </p>

      {/* Products */}
      <div className="product-grid">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <p className="no-products">
          No products found.
        </p>
      )}

    </div>
  );
}

export default Products;