import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function CreateAccount() {
  const ctx = useContext(UserContext);
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const validate = () => {
    let hasError = false;
    if (!name) setNameIsValid(false);
    if (!email) {
      setEmailIsValid(false);
      setEmailErrorMessage("Email is required!");
    } else {
      let isEmailSyntaxCorrect = email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (!isEmailSyntaxCorrect) {
        setEmailIsValid(false);
        setEmailErrorMessage("Email format is invalid!");
        hasError = true;
      }
    }
    if (!password) {
      setPasswordIsValid(false);
      setPasswordErrorMessage("Password is required!");
    } else {
      if (password.length < 8) {
        setPasswordIsValid(false);
        setPasswordErrorMessage("Password needs to have at least 8 letters!");
        hasError = true;
      }
    }
    if (!name || !email || !password) {
      hasError = true;
    }
    return !hasError;
  };

  const handleCreate = () => {
    if (validate()) {
      ctx.users.push({ name, email, password, balance: 100 });
      ctx.activities.push({
        name,
        email,
        action: "Create Account",
        stamp: new Date().toString(),
      });
      setIsNewAccount(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setNameIsValid(true);
    setEmailIsValid(true);
    setEmailErrorMessage("");
    setPasswordIsValid(true);
    setPasswordErrorMessage("");
    setIsNewAccount(true);
    setIsFormEmpty(true);
  };

  return (
    <Card
      bgcolor="light"
      headerbg="primary"
      header="Create Account"
      body={
        isNewAccount ? (
          <>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                  setNameIsValid(true);
                  if (e.currentTarget.value) setIsFormEmpty(false);
                  else setIsFormEmpty(true);
                }}
              />
              {!nameIsValid && (
                <div className="text-danger mt-1">Name is required!</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setEmailIsValid(true);
                  setEmailErrorMessage("");
                  if (e.currentTarget.value) setIsFormEmpty(false);
                  else setIsFormEmpty(true);
                }}
              />
              {!emailIsValid && (
                <div className="text-danger mt-1">{emailErrorMessage}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setPasswordIsValid(true);
                  setPasswordErrorMessage("");
                }}
              />
              {!passwordIsValid && (
                <div className="text-danger mt-1">{passwordErrorMessage}</div>
              )}
            </div>
            <button
              disabled={isFormEmpty}
              type="submit"
              className="btn btn-primary"
              onClick={() => handleCreate()}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h4>Account created successfully!</h4>
            <div className="mt-3">
              <button className="btn btn-secondary" onClick={() => clearForm()}>
                Add another account
              </button>
              <Link className="btn btn-primary ml-2" to="login">
                Login now
              </Link>
            </div>
          </>
        )
      }
    />
  );
}
