import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Withdraw() {
  const ctx = useContext(UserContext);
  const [warning, setWarning] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(ctx.session.balance);

  const handleSubmit = () => {
    if (validateWithdraw()) {
      const newBalance = Number(balance) - Number(withdrawAmount);
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
        action: "Withdraw",
        stamp: new Date().toString(),
      });
      setWithdrawAmount("");
      alert("Withdraw process has successfully finished!");
    }
  };

  const validateWithdraw = () => {
    let withdrawAmountNumber = Number(withdrawAmount);
    if (isNaN(withdrawAmount)) {
      setWarning(
        "Deposit amount is invalid. Please make sure to enter valid numbers!"
      );
      setWithdrawAmount("");
      return false;
    } else if (withdrawAmountNumber < 0) {
      setWarning("Withdraw amount cannot be negative!");
      setWithdrawAmount("");
      return false;
    } else if (withdrawAmountNumber === 0) {
      setWarning("Withdraw amount cannot be zero!");
      setWithdrawAmount("");
      return false;
    } else if (withdrawAmountNumber > Number(balance)) {
      setWarning("You don't have sufficient balance to withdraw !");
      setWithdrawAmount("");
      return false;
    }
    return true;
  };

  return (
    <Card
      bgcolor="light"
      headerbg="warning"
      header="Withdraw"
      warn={warning}
      body={
        Object.keys(ctx.session).length > 0 ? (
          <div>
            <h4>Current Balance $ {balance}</h4>
            <input
              className="form-control"
              value={withdrawAmount}
              onChange={(e) => {
                setWithdrawAmount(e.currentTarget.value);
                setWarning("");
              }}
            />
            <button
              disabled={!withdrawAmount}
              type="submit"
              className="btn btn-warning mt-4"
              onClick={handleSubmit}
            >
              Process Transaction
            </button>
          </div>
        ) : (
          <>
            <div>Please login to withdraw</div>
            <Link className="btn btn-warning mt-3" to="login">
              Login
            </Link>
          </>
        )
      }
    />
  );
}
