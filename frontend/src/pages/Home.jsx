import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* HERO SECTION */}
      <section className="home-hero">

        <h1>Your Trusted Store</h1>

        <h2>Serving Since 1995</h2>

        <p>
          Quality products for your everyday needs at reasonable prices.
        </p>

        <Link to="/products" className="explore-button">
          Explore Products
        </Link>

      </section>


      {/* CATEGORIES SECTION */}
      <section className="categories">

        <h2>Our Categories</h2>

        <div className="category-list">

          <div className="category-item">
            Grocery
          </div>

          <div className="category-item">
            Snacks
          </div>

          <div className="category-item">
            Beverages
          </div>

          <div className="category-item">
            Household
          </div>

          <div className="category-item">
            Personal Care
          </div>

          <div className="category-item">
            Stationery
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;