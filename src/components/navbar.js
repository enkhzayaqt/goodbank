import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="register"
                title="Create new bank account"
              >
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="login"
                title="Login to bank account"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="deposit"
                title="Deposit to your bank account"
              >
                Deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="withdraw"
                title="Withdraw from your bank account"
              >
                Withdraw
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="alldata"
                title="To see all activity logs"
              >
                All Data
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="profile"
                title="Profile information"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
