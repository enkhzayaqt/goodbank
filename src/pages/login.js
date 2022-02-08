import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Login() {
  const ctx = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [warn, setWarn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validate(field, label) {
    if (!field) {
      setWarn(label.toUpperCase() + "warning!");
      setTimeout(() => setWarn(""), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    let account = ctx.users.find(
      (item) => item.email === email && item.password === password
    );
    if (!account) {
      setWarn("Username or password is incorrect!");
      setTimeout(() => setWarn(""), 4000);
      return;
    }
    let name = account.name;
    setEmail(account.email);
    ctx.activities.push({
      name,
      email,
      action: "Login",
      stamp: new Date().toString(),
    });
    ctx.session = { name, email, balance: account.balance };
    setShow(false);
  }

  return (
    <Card
      bgcolor="info"
      txtcolor="light"
      header="Login"
      warn={warn}
      body={
        show ? (
          <>
            <div style={{ maxWidth: "30rem" }}>
              <div>Email</div>
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <div>Password</div>
              <input
                type="input"
                minLength="8"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
              <button
                disabled={!email && !password}
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
                style={{ margin: "10px" }}
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            <h5>Your Account Session has been Succesfully Started</h5>
            <Link className="nav-link" className="btn btn-dark" to="deposit">
              Deposit
            </Link>
            <Link className="nav-link" className="btn btn-dark" to="withdraw">
              Withdraw
            </Link>
          </>
        )
      }
    />
  );
}
