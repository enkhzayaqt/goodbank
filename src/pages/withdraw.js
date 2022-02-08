import React from "react";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [status, setStatus] = React.useState("");
  const [warn, setWarn] = React.useState("");
  const [transAmount, setTransAmount] = React.useState("");
  const [balance, setBalance] = React.useState(ctx.session.balance);

  function handleSubmit() {
    if (
      Math.sign(Number(transAmount)) === 1 ||
      Math.sign(Number(transAmount)) === 0
    ) {
      if (Number(transAmount) > Number(balance)) {
        setWarn(
          "UNABLE TO COMPLETE TRANSACTION DUE TO WITHDRAW AMOUNT EXCEEDING AVAILABLE BALANCE"
        );
        setTimeout(() => setWarn(""), 3000);
        return;
      }
      setBalance(Number(balance) - Number(transAmount));
      ctx.session.balance = Number(ctx.session.balance) - Number(transAmount);
      let name = ctx.session.name;
      let email = ctx.session.email;
      setStatus("Your Transaction has Succesfully Completed");
      setTimeout(() => setStatus(""), 3000);
      setTransAmount("");
      updateUser(email);
      ctx.activities.push({
        name,
        email,
        action: "Withdraw",
        stamp: new Date().toString(),
      });
    } else {
      setWarn(
        "You have entered in invalid number. Please make sure to not add -"
      );
      setTransAmount("");
      setTimeout(() => setWarn(""), 3000);
    }
  }

  function updateUser(email) {
    ctx.users.map((item) => {
      if (item.email === email) {
        item.balance = ctx.session.balance;
      }
    });
  }

  return (
    <Card
      bgcolor="secondary"
      txtcolor="light"
      header="Withdraw"
      status={status}
      warn={warn}
      body={
        Object.keys(ctx.session).length > 0 ? (
          <div style={{ maxWidth: "30rem" }}>
            <h4>Current Balance $ {balance}</h4>
            <input
              type="number"
              className="form-control"
              value={transAmount}
              onChange={(e) => setTransAmount(e.currentTarget.value)}
              required
            />
            <button
              disabled={!transAmount}
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
              style={{ margin: "10px" }}
            >
              Process Transaction
            </button>
          </div>
        ) : (
          <>
            <div>
              Please Login in to View Account Balance and Process Transactions
            </div>
          </>
        )
      }
    />
  );
}
