import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Deposit() {
  const ctx = useContext(UserContext);
  const [warning, setWarning] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [balance, setBalance] = useState(ctx.session.balance);

  const handleSubmit = () => {
    if (validateDeposit()) {
      const newBalance = Number(balance) + Number(depositAmount);
      setBalance(newBalance);
      ctx.session.balance = newBalance;
      ctx.users.map((user) => {
        if (user.email === ctx.session.email) {
          user.balance = newBalance;
        }
      });
      ctx.activities.push({
        name: ctx.session.name,
        email: ctx.session.email,
        action: "Deposit",
        stamp: new Date().toString(),
      });
      setDepositAmount("");
      alert("Deposit has successfully made!");
    }
  };

  const validateDeposit = () => {
    let depositAmountNumber = Number(depositAmount);
    if (isNaN(depositAmount)) {
      setWarning(
        "Deposit amount is invalid. Please make sure to enter valid numbers!"
      );
      setDepositAmount("");
      return false;
    } else if (depositAmountNumber < 0) {
      setWarning("Deposit amount cannot be negative!");
      setDepositAmount("");
      return false;
    } else if (depositAmountNumber === 0) {
      setWarning("Deposit amount cannot be zero!");
      setDepositAmount("");
      return false;
    }
    return true;
  };

  return (
    <Card
      bgcolor="light"
      header="Deposit"
      headerbg="success"
      warn={warning}
      body={
        Object.keys(ctx.session).length > 0 ? (
          <div>
            <h4>Current Balance $ {balance}</h4>
            <input
              className="form-control"
              value={depositAmount}
              onChange={(e) => {
                setDepositAmount(e.currentTarget.value);
                setWarning("");
              }}
            />
            <button
              disabled={!depositAmount}
              type="submit"
              className="btn btn-success mt-4"
              onClick={handleSubmit}
            >
              Process Transaction
            </button>
          </div>
        ) : (
          <>
            <div>Please login to make a deposit</div>
            <Link className="btn btn-success mt-3" to="login">
              Login
            </Link>
          </>
        )
      }
    />
  );
}
