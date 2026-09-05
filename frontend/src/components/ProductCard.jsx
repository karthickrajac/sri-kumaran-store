function ProductCard({ product }) {
  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Product Information */}
      <div className="product-info">

        <h2>{product.name}</h2>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-unit">
          Sold by: {product.unit}
        </p>

        {/* Price */}
        <div className="price-section">

          <div className="mrp">
            MRP: ₹{product.mrp}
          </div>

          <div className="selling-price">
            Selling Price: ₹{product.sellingPrice}
          </div>

        </div>

        {/* Stock */}
        <p className="stock-status">
          {product.stock > 0
            ? `In Stock: ${product.stock} ${product.unit}`
            : "Currently unavailable"}
        </p>

      </div>

    </div>
  );
}

export default ProductCard;