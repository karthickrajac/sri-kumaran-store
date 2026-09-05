import { useEffect, useState } from "react";
import {
  getProducts,
  getSales,
  getTodaySales,
} from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [todaySales, setTodaySales] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [productsData, salesData, todaySalesData] =
        await Promise.all([
          getProducts(),
          getSales(),
          getTodaySales(),
        ]);

      setProducts(productsData);
      setSales(salesData);
      setTodaySales(todaySalesData);
    } catch (error) {
      console.error(
        "Failed to load dashboard data:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (product) => product.stock <= 10
  ).length;

  const totalBills = sales.length;

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>Shopkeeper Dashboard</h1>
        <p>Manage Sri Kumaran Store</p>
      </div>

      <div className="dashboard-cards">

        {/* Total Products */}

        <div className="dashboard-card">
          <h2>Total Products</h2>

          <p className="dashboard-number">
            {loading ? "..." : totalProducts}
          </p>

          <p>
            Products available in store
          </p>
        </div>


        {/* Low Stock */}

        <div className="dashboard-card">
          <h2>Low Stock</h2>

          <p className="dashboard-number">
            {loading ? "..." : lowStockProducts}
          </p>

          <p>
            Products with stock below 10
          </p>
        </div>


        {/* Today's Sales */}

        <div className="dashboard-card">
          <h2>Today's Sales</h2>

          <p className="dashboard-number">
            {loading
              ? "..."
              : `₹${todaySales.toFixed(2)}`}
          </p>

          <p>
            Sales made today
          </p>
        </div>


        {/* Total Bills */}

        <div className="dashboard-card">
          <h2>Total Bills</h2>

          <p className="dashboard-number">
            {loading ? "..." : totalBills}
          </p>

          <p>
            Bills generated
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;