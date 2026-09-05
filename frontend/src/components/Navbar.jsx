import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Sri Kumaran Store
        </Link>

        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/manage-products">
            Manage Products
          </Link>

          <Link to="/billing">
            Billing
          </Link>
          <Link to="/sales">Sales</Link>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;