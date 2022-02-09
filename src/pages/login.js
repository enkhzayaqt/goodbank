import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Login() {
  const ctx = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    let account = ctx.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!account) {
      setWarning("Username or password is incorrect!");
      return;
    } else {
      ctx.activities.push({
        name: account.name,
        email: account.email,
        action: "Login",
        stamp: new Date().toString(),
      });
      ctx.session = {
        name: account.name,
        email: account.email,
        balance: account.balance,
      };
      setShow(false);
    }
  };

  return (
    <Card
      headerbg="info"
      bgcolor="light"
      header="Login"
      warn={warning}
      body={
        Object.keys(ctx.session).length > 0 ? (
          <>
            <h4>Welcome to Bad Bank Portal!</h4>
            <div className="mb-4">You have successfully logged in.</div>
            <Link className="btn btn-success" to="deposit">
              Deposit
            </Link>
            <Link className="btn btn-warning ml-3" to="withdraw">
              Withdraw
            </Link>
          </>
        ) : (
          <>
            <div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="input"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    setWarning("");
                  }}
                />
              </div>
              <div className="mb-4">
                <div>Password</div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    setWarning("");
                  }}
                />
              </div>
              <button
                disabled={!email || !password}
                type="submit"
                className="btn btn-info"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </>
        )
      }
    />
  );
}
