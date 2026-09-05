import { useEffect, useState } from "react";
import { getSales } from "../services/api";
import "./Sales.css";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error("Failed to load sales:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sales-page">

      <div className="sales-header">
        <h1>Sales History</h1>
        <p>View all customer bills</p>
      </div>

      {loading ? (
        <p className="sales-message">
          Loading sales...
        </p>
      ) : sales.length === 0 ? (
        <p className="sales-message">
          No sales found.
        </p>
      ) : (
        <div className="sales-table-container">

          <table className="sales-table">

            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {sales.map((sale) => (

                <tr key={sale.id}>

                  <td>
                    #{sale.id}
                  </td>

                  <td>
                    {new Date(sale.saleDate).toLocaleString()}
                  </td>

                  <td>
                    {sale.paymentMethod}
                  </td>

                  <td>
                    ₹{sale.totalAmount.toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Sales;