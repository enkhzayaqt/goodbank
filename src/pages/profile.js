import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { UserContext } from "../context";

export default function Logout() {
  const ctx = useContext(UserContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    ctx.session = {};
    setIsLoggedOut(true);
  };

  return (
    <Card
      headerbg="secondary"
      bgcolor="light"
      header="Profile"
      body={
        Object.keys(ctx.session).length > 0 ? (
          <div>
            <div>{ctx.session.name}</div>
            <div>{ctx.session.email}</div>
            <button onClick={() => logout()} className="btn btn-info mt-4">
              Logout
            </button>
          </div>
        ) : (
          <>
            <div>Please login</div>
            <Link className="btn btn-info mt-3" to="login">
              Login
            </Link>
          </>
        )
      }
    />
  );
}
